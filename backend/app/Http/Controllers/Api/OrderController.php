<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('items.product')->latest()->get();

        return response()->json([
            'data' => $orders,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'address' => 'required|string|max:255',
            'phone' => 'required|string|max:30',
            'payment_method' => 'required|string|max:50',
            'total_price' => 'required|numeric|min:0',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        $user = $request->user();

        $order = DB::transaction(function () use ($validated, $user) {
            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $validated['total_price'],
                'status' => 'pending',
                'address' => $validated['address'],
                'phone' => $validated['phone'],
                'payment_method' => $validated['payment_method'],
            ]);

            foreach ($validated['items'] as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            return $order;
        });

        return response()->json($order->load('items.product'), 201);
    }

    public function adminIndex()
    {
        $orders = Order::with(['user', 'items.product'])->latest()->get();

        return response()->json([
            'data' => $orders,
        ]);
    }

    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'status' => 'required|string|in:pending,processing,completed,cancelled',
        ]);

        $order->update([
            'status' => $validated['status'],
        ]);

        return response()->json($order->load(['user', 'items.product']));
    }
}
