<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    const IS_PAID_UNPAID = 0;
    const IS_PAID_PAID = 1;
    const IS_PAID_APPROVE = 2;
    const IS_PAID_REJECT = 3;
    const IS_PAID_DRAFT = 4;

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

    protected $appends = ['status'];

    public function getStatusAttribute()
    {
        return [
            self::IS_PAID_DRAFT => 'Draft',
            self::IS_PAID_UNPAID => 'Unpaid',
            self::IS_PAID_PAID => 'Paid',
            self::IS_PAID_APPROVE => 'Approve',
            self::IS_PAID_REJECT => 'Reject',
        ][$this->is_paid];
    }
}
