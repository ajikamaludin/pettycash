<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

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

        if ($request->q) {
            $query->where('name', 'like', '%'.$request->q.'%')
            ->orWhere('description', 'like', '%'.$request->q.'%')
            ->orWhere('job_number', 'like', '%'.$request->q.'%')
            ->orWhere('amount', 'like', '%'.$request->q.'%');
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
            '_limit' => $limit
        ]);
    }

    public function destroy(Expense $expense)
    {
        $expense->delete();
    }
}
