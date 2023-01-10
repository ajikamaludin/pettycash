<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    const IS_PAID_DRAFT = 1;
    const IS_PAID_UNPAID = 1;
    const IS_PAID_PAID = 2;
    const IS_PAID_APPROVE = 3;
    const IS_PAID_REJECT = 4;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'name',
        'job_number',
        'description',
        'date_expense',
        'amount',
        'isIncome',
        'is_paid',
    ];
}
