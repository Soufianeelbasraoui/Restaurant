<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'subject',
        'message',
        'status',
        'guests',
        'reservation_date',
    ];

    protected $casts = [
        'guests' => 'integer',
        'reservation_date' => 'datetime',
    ];
}
