<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn () => redirect()->route('expenses.index'))->name('dashboard');

    // Expense & Income Page
    Route::get('/expenses', [ExpenseController::class, 'index'])->name('expenses.index');
    Route::delete('/expenses/{expense}', [ExpenseController::class, 'destroy'])->name('expenses.destroy');

    // Monitor Booking
    Route::get('/monitoring-booking', [BookingController::class, 'index'])->name('monitoring-booking.index');
    Route::post('/monitoring-booking', [BookingController::class, 'store'])->name('monitoring-booking.store');
    Route::put('/monitoring-booking/{booking}', [BookingController::class, 'update'])->name('monitoring-booking.update');
    Route::delete('/monitoring-booking/{booking}', [BookingController::class, 'destroy'])->name('monitoring-booking.destroy');
    Route::get('/monitoring-booking/export', [BookingController::class, 'export'])->name('monitoring-booking.export');
    Route::post('/monitoring-booking/import', [BookingController::class, 'import'])->name('monitoring-booking.import');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
});

require __DIR__.'/auth.php';
