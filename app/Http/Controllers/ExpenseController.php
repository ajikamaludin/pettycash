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

        if ($request->start_date && $request->end_date) {
            $startDate = Carbon::parse($request->start_date);
            $endDate = Carbon::parse($request->end_date);

            $query->whereDate('date_expense', '<=', $endDate)
                ->whereDate('date_expense', '>=', $startDate);
        }

        if ($request->q) {
            $query->where('name', 'like', '%'.$request->q.'%')
            ->orWhere('description', 'like', '%'.$request->q.'%')
            ->orWhere('job_number', 'like', '%'.$request->q.'%')
            ->orWhere('amount', 'like', '%'.$request->q.'%');
        }

        if (!$request->start_date) {
            $endDate = Carbon::now();
            $startDate = $today->subDays(30);

            $query->whereDate('date_expense', '<=', $endDate)
                ->whereDate('date_expense', '>=', $startDate);
        }

        $limit = $request->limit ? $request->limit : 10;
        
        return inertia('Expense/Index', [
            'expenses' => $query->paginate($limit), 
            'start_date' => $startDate, 
            'end_date' => $endDate, 
            '_limit' => $limit
        ]);
    }
}
