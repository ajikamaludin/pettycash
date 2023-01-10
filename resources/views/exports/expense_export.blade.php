<table>
   <thead>
      <tr>
         <th>Daily Report</th>
      </tr>
      <tr>
         <th>Periode : {{$startDate . ' to ' . $endDate}}</th>
      </tr>
      <tr>
         <th>NO</th>
         <th>VOUCHER</th>
         <th>DATE</th>
         <th>NAME</th>
         <th>JOB NUMBER</th>
         <th>DESCRIPTION</th>
         <th>ESTIMATION</th>
         <th>DEBET</th>
         <th>KREDIT</th>
         <th>BALANCE</th>
      </tr>
   </thead>
   <tbody>
      @foreach($expenses as $expense)
      <tr>
         <td>{{ $loop->index + 1 }}</td>
         <td>{{ $loop->index + 1 }}</td>
         <td>{{ $expense->date_expense }}</td>
         <td>{{ $expense->name }}</td>
         <td>{{ $expense->job_number }}</td>
         <td>{{ $expense->description }}</td>
         <td>{{ $expense->estimation }}</td>
         <td>{{ (!$expense->isIncome) ? $expense->amount : '' }}</td>
         <td>{{ ($expense->isIncome) ? $expense->amount : '' }}</td>
         <td>{{ $expense->subBalance }}</td>
      </tr>
      @endforeach
   </tbody>
</table>