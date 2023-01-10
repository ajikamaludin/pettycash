<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'master_awb',
        'flight_number',
        'departure',
        'destination',
        'jumlah_koli',
        'kemasan',
        'booked',
        'used',
        'is_available',
    ];
}
