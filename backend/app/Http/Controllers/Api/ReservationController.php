<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:30',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
            'guests' => 'nullable|integer|min:1',
            'reservation_date' => 'nullable|date',
        ]);

        $reservation = Reservation::create($validated);

        return response()->json([
            'message' => 'Réservation enregistrée avec succès',
            'data' => $reservation,
        ], 201);
    }

    public function index()
    {
        return response()->json(Reservation::latest()->get());
    }

    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json([
            'message' => 'Réservation supprimée avec succès',
        ]);
    }
}
