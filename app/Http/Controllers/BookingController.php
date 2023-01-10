<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    public function index(Request $request) 
    {
        Booking::where('is_available', 0)
            ->where(DB::raw('DATE(departure)'), '<', now()->toDateString())
            ->update(['is_available' => 1]);

        $query = Booking::orderBy('departure', 'ASC');

        $last_updated = Booking::select('updated_at')->latest('updated_at')->first();

        if ($last_updated !== null) {
            $last_updated = $last_updated->updated_at;
        }

        if ($request->q !== null) {
            $query->where('master_awb', 'like', '%' . $request->q . '%')
                ->orWhere('flight_number', 'like', '%' . $request->q . '%')
                ->orWhere('departure', 'like', '%' . $request->q . '%')
                ->orWhere('destination', 'like', '%' . $request->q . '%');
        }

        $startDate = now()->startOfMonth()->toDateString();
        $endDate = now()->endOfMonth()->toDateString();

        if ($request->startDate != null) {
            $startDate = Carbon::parse($request->startDate)->toDateString();
        }

        if ($request->endDate != null) {
            $endDate = Carbon::parse($request->endDate)->toDateString();
        }

        $query->whereBetween(DB::raw('DATE(departure)'), [$startDate, $endDate]);

        $limit = $request->limit ? $request->limit : 10;

        return inertia('Booking/Index', [
            'booking' => $query->paginate($limit),
            'last_updated' => $last_updated,
            '_startDate' => $startDate,
            '_endDate' => $endDate,
            '_limit' => $limit
        ]);
    }
}
