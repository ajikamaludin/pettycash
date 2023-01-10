<?php

namespace App\Http\Controllers;

use App\Exports\BookingsExport;
use App\Imports\BookingsImport;
use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

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

    public function store(Request $request)
    {
        $request->validate([
            'booked' => ['required', 'numeric'],
            'departure' => ['required'],
            'destination' => ['required'],
            'flight_number' => ['required'],
            'kemasan' => ['required'],
            'master_awb' => ['required'],
            'used' => ['required', 'numeric'],
            'is_available' => ['required', 'in:0,1']
        ]);

        Booking::create([
            'master_awb' => $request->master_awb,
            'flight_number' => $request->flight_number,
            'departure' => $request->departure,
            'destination' => $request->destination,
            'kemasan' => $request->kemasan,
            'booked' => $request->booked,
            'used' => $request->used,
            'is_available' => $request->is_available,
        ]);

        return redirect()->back()->with('success', 'Booking created.');
    }

    public function update(Request $request, Booking $booking)
    {
        $request->validate([
            'booked' => ['required', 'numeric'],
            'departure' => ['required'],
            'destination' => ['required'],
            'flight_number' => ['required'],
            'kemasan' => ['required'],
            'master_awb' => ['required'],
            'used' => ['required', 'numeric'],
            'is_available' => ['required', 'in:0,1']
        ]);

        $booking->update([
            'master_awb' => $request->master_awb,
            'flight_number' => $request->flight_number,
            'departure' => $request->departure,
            'destination' => $request->destination,
            'kemasan' => $request->kemasan,
            'booked' => $request->booked,
            'used' => $request->used,
            'is_available' => $request->is_available,
        ]);

        return redirect()->back()->with('success', 'Booking updated.');
    }

    public function destroy(Booking $booking)
    {
        $booking->delete();
    }

    public function export()
    {
        return Excel::download(new BookingsExport, 'bookings.xlsx');
    }

    public function import(Request $request)
    {
        if (request()->file('file_booking_import') != null) {
            Excel::import(new BookingsImport, request()->file('file_booking_import'));
        }

        return redirect()->route('monitoring-booking.index');
    }
}
