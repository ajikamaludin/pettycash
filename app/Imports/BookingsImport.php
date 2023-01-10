<?php

namespace App\Imports;

use App\Models\Booking;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithUpserts;

class BookingsImport implements ToModel, WithStartRow, WithUpserts
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        if (!isset($row[0])) {
            return null;
        }

        $exists = Booking::where([
                ['master_awb', '=', $row[0]],
                ['flight_number', '=', $row[1]],
                ['departure', '=', $row[2]],
                ['destination', '=', $row[3]],
                ['jumlah_koli', '=', $row[4]],
                ['kemasan', '=', $row[5]],
                ['booked', '=', $row[6]],
                ['used', '=', $row[7]],
            ])->count();

        if ($exists > 0) {
            return null;
        }

        return new Booking([
            'master_awb' => $row[0],
            'flight_number' => $row[1],
            'departure' => $row[2],
            'destination' => $row[3],
            'jumlah_koli' => $row[4],
            'kemasan' => $row[5],
            'booked' => $row[6],
            'used' => $row[7],
        ]);
    }

    public function startRow(): int
    {
        return 2;
    }

    public function uniqueBy()
    {
        return 'master_awb';
    }
}
