<table>
   <thead>
      <tr>
         <th><strong>MASTER AWB</strong></th>
         <th><strong>FLIGHT NUMBER</strong></th>
         <th><strong>DEPARTURE</strong></th>
         <th><strong>DESTINATION</strong></th>
         <th><strong>JUMLAH KOLI</strong></th>
         <th><strong>JENIS KEMASAN</strong></th>
         <th><strong>BOOKED</strong></th>
         <th><strong>USED</strong></th>
      </tr>
   </thead>
   <tbody>
      @foreach($bookings as $booking)
      <tr>
         <td>{{ $booking->master_awb }}</td>
         <td>{{ $booking->flight_number }}</td>
         <td>{{ $booking->departure }}</td>
         <td>{{ $booking->destination }}</td>
         <td>{{ $booking->jumlah_koli }}</td>
         <td>{{ $booking->kemasan}}</td>
         <td>{{ $booking->booked}}</td>
         <td>{{ $booking->used }}</td>
      </tr>
      @endforeach
   </tbody>
</table>