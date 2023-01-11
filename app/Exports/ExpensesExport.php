<?php

namespace App\Exports;

use App\Models\Expense;
use Carbon\Carbon;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Request;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ExpensesExport implements WithHeadings, FromView
{
    public $begining_balance = 0;

    public function view(): View
    {
        $today = now();

        $query = Expense::query()->orderBy('date_expense', 'ASC');

        if (request('start_date') && request('end_date')) {
            $startDate = Carbon::parse(request('start_date'));
            $endDate = Carbon::parse(request('end_date'));

            $query->whereDate('date_expense', '<=', request('end_date'))
                ->whereDate('date_expense', '>=', request('start_date'));
        }

        if (!request('start_date')) {
            $endDate = Carbon::now();
            $startDate = $today->subDays(30);

            $query->whereDate('date_expense', '<=', $endDate)
                ->whereDate('date_expense', '>=', $startDate);
        }

        if (request('ids')) {
            $expenseIds = request('ids');
            $query->whereIn('id', $expenseIds);
        }

        $endBalanceDate = $startDate->subDay();
        $beginingBalance = Expense::select(['amount', 'isIncome'])->whereDate('date_expense', '<=', $endBalanceDate);

        $this->begining_balance = $beginingBalance->get()->map(function ($expense, $key) {
            return (!$expense->isIncome) ? $expense->amount * -1 : $expense->amount;
        })->sum();

        $beginingBalance = $this->begining_balance;

        $expenseAndBalance = $query->get()->map(function ($item, $key) {
            if ($item->isIncome) {
                $item->subBalance = $this->begining_balance + $item->amount;
                $this->begining_balance = $item->subBalance;
                $item->date_expense = Carbon::parse($item->date_expense)->format('d - m - Y');
                return $item;
            }

            $item->subBalance = $this->begining_balance - $item->amount;
            $this->begining_balance = $item->subBalance;
            $item->date_expense = Carbon::parse($item->date_expense)->format('d - m - Y');
            return $item;
        });

        return view('exports.expense_export', [
            'expenses' => $expenseAndBalance,
            'beginingBalance' => $beginingBalance,
            'startDate' => $startDate->format('d/m/Y'),
            'endDate' => $endDate->format('d/m/Y'),
        ]);
    }

    public function headings(): array
    {
        return [
            'NO',
            'VOUCHER',
            'DATE',
            'NAME',
            'JOB NUMBER',
            'DESCRIPTION',
            'ESTIMATION',
            'DEBET',
            'KREDIT',
            'BALANCE',
        ];
    }
}
