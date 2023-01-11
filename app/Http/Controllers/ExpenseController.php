<?php

namespace App\Http\Controllers;

use App\Exports\ExpensesExport;
use App\Models\Expense;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $isAdmin = Auth::user()->role === User::ROLE_CASIER;
        $today = Carbon::now();
        $query = Expense::query();
        
        if ($isAdmin) {
            $query->orderBy('date_expense', 'DESC');
        }

        if (!$isAdmin) {
            $query->where('isIncome', 0)->orderBy('created_at', 'DESC');
        }

        if ($request->q != null) {
            $query->where('name', 'like', '%'.$request->q.'%')
            ->orWhere('description', 'like', '%'.$request->q.'%')
            ->orWhere('job_number', 'like', '%'.$request->q.'%');
        }

        $endDate = Carbon::now()->toDateString();
        $startDate = $today->subDays(30)->toDateString();

        if ($request->startDate != null && $request->endDate != null) {
            $startDate = Carbon::parse($request->startDate)->toDateString();
            $endDate = Carbon::parse($request->endDate)->toDateString();
        }

        $query->whereDate('date_expense', '<=', $endDate)
                ->whereDate('date_expense', '>=', $startDate);

        $limit = $request->limit ? $request->limit : 10;

        return inertia('Expense/Index', [
            'expenses' => $query->paginate($limit),
            '_startDate' => $startDate,
            '_endDate' => $endDate,
            '_limit' => $limit,
            '_q' => $request->q
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'description' => ['required'],
            'date_expense' => ['required', 'date'],
            'amount' => ['required', 'numeric'],
            'is_paid' => ['required', 'in:0,1,2,3'],
            'isIncome' => ['required', 'in:0,1'],
        ]);

        if ($request->isIncome === 0) {
            $request->validate([
                'name' => ['required'],
                'job_number' => ['required'],
            ]);
        }

        Expense::create([
            'name' => $request->name,
            'description' => $request->description,
            'job_number' => $request->job_number,
            'date_expense' => Carbon::parse($request->date_expense)->toDateString(),
            'amount' => $request->amount,
            'is_paid' => $request->is_paid,
            'isIncome' => $request->isIncome,
        ]);

        return redirect()->route('expenses.index');
    }

    public function update(Request $request, Expense $expense)
    {
        $request->validate([
            'description' => ['required'],
            'date_expense' => ['required', 'date'],
            'amount' => ['required', 'numeric'],
            'is_paid' => ['required', 'in:0,1,2,3'],
            'isIncome' => ['required', 'in:0,1'],
        ]);

        if ($request->isIncome === 0) {
            $request->validate([
                'name' => ['required'],
                'job_number' => ['required'],
            ]);
        }

        $expense->update([
            'name' => $request->name,
            'description' => $request->description,
            'job_number' => $request->job_number,
            'date_expense' => Carbon::parse($request->date_expense)->toDateString(),
            'amount' => $request->amount,
            'is_paid' => $request->is_paid,
            'isIncome' => $request->isIncome,
        ]);

        return redirect()->route('expenses.index');
    }

    public function decision(Expense $expense, $status)
    {
        $expense->update(['is_paid' => $status]);
        return redirect()->route('expenses.index');
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();
    }

    public function export()
    {
        return Excel::download(new ExpensesExport, 'expenses.xlsx');
    }
}
