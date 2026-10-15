<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function stats()
    {
        $totalOrders = Order::count();
        $totalRevenue = Order::where('status', '!=', 'cancelled')->sum('total_price');
        $pendingOrders = Order::where('status', 'pending')->count();
        $totalProducts = Product::count();

        return response()->json([
            'total_orders' => $totalOrders,
            'total_revenue' => (float) $totalRevenue,
            'pending_orders' => $pendingOrders,
            'total_products' => $totalProducts,
        ]);
    }

    public function analytics()
    {
        $revenue = Order::where('status', '!=', 'cancelled')->sum('total_price');
        $ordersCount = Order::count();
        $customersCount = User::where('role', '!=', 'admin')->count();
        $reservationsCount = Reservation::count();

        // Calculate monthly revenue for current year (12 months)
        $currentYear = date('Y');
        $monthlyData = Order::select(
            DB::raw('MONTH(created_at) as month'),
            DB::raw('SUM(total_price) as total')
        )
            ->whereYear('created_at', $currentYear)
            ->where('status', '!=', 'cancelled')
            ->groupBy('month')
            ->pluck('total', 'month')
            ->toArray();

        $chart = [];
        for ($m = 1; $m <= 12; $m++) {
            $chart[] = isset($monthlyData[$m]) ? (float) $monthlyData[$m] : 0.0;
        }

        $categories = Category::withCount('products')->get()->map(function ($cat) {
            return [
                'name' => $cat->name,
                'count' => $cat->products_count,
            ];
        });

        return response()->json([
            'data' => [
                'metrics' => [
                    'revenue' => (float) $revenue,
                    'orders' => $ordersCount,
                    'customers' => $customersCount,
                    'reservations' => $reservationsCount,
                ],
                'chart' => $chart,
                'categories' => $categories,
            ],
        ]);
    }

    public function notifications()
    {
        $orders = Order::with('user')->latest()->take(10)->get();
        $reservations = Reservation::latest()->take(10)->get();
        $users = User::latest()->take(10)->get();

        return response()->json([
            'data' => [
                'orders' => $orders,
                'reservations' => $reservations,
                'users' => $users,
            ],
        ]);
    }

    public function search(Request $request)
    {
        $q = $request->query('q', '');

        if (empty(trim($q))) {
            return response()->json([
                'data' => [
                    'products' => [],
                    'orders' => [],
                    'users' => [],
                ],
            ]);
        }

        $products = Product::where('name', 'like', "%{$q}%")->take(5)->get();
        $orders = Order::with('user')
            ->where('id', 'like', "%{$q}%")
            ->orWhere('address', 'like', "%{$q}%")
            ->orWhere('phone', 'like', "%{$q}%")
            ->take(5)
            ->get();
        $users = User::where('name', 'like', "%{$q}%")
            ->orWhere('email', 'like', "%{$q}%")
            ->take(5)
            ->get();

        return response()->json([
            'data' => [
                'products' => $products,
                'orders' => $orders,
                'users' => $users,
            ],
        ]);
    }

    public function customers()
    {
        $customers = User::where('role', '!=', 'admin')
            ->with(['orders.items'])
            ->withCount('orders')
            ->latest()
            ->get()
            ->map(function ($u) {
                $totalSpent = $u->orders->where('status', '!=', 'cancelled')->sum('total_price');
                return [
                    'id' => $u->id,
                    'name' => $u->name,
                    'email' => $u->email,
                    'phone' => $u->phone ?? 'N/A',
                    'address' => $u->address ?? 'N/A',
                    'role' => $u->role,
                    'created_at' => $u->created_at,
                    'orders_count' => $u->orders_count,
                    'total_spent' => (float) $totalSpent,
                    'orders' => $u->orders,
                ];
            });

        return response()->json([
            'data' => $customers,
        ]);
    }

    public function deleteCustomer($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json([
            'message' => 'Client supprimé avec succès',
        ]);
    }

    public function getSettings()
    {
        $settings = Setting::pluck('value', 'key')->all();

        return response()->json([
            'data' => $settings,
        ]);
    }

    public function saveSettings(Request $request)
    {
        $data = $request->all();

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => is_array($value) ? json_encode($value) : (string) $value]
            );
        }

        return response()->json([
            'message' => 'Paramètres enregistrés avec succès',
            'data' => Setting::pluck('value', 'key')->all(),
        ]);
    }
}
