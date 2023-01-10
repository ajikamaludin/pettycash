<?php

namespace App\Exports;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromView;

class BookingsExport implements FromView
{
    use Exportable;

    /**
     * @return \Illuminate\Support\Collection
     */
    public function view(): View
    {
        $query = Booking::query()->orderBy('departure', 'ASC');

        if (request('ids')) {
            $bookingIds = request('ids');
            $query->whereIn('id', $bookingIds);
        }

        $bookings = $query->get()->map(function ($item, $key) {
            $item->departure = Carbon::parse($item->departure)->format('Y-m-d');
            return $item;
        });

        return view('exports.bookings_export', [
            'bookings' => $bookings,
        ]);
    }
}
