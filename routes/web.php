<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MikrotikController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\UserController;
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
    return Inertia::render('Landing/Index', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Customer
    Route::resource('/customer', CustomerController::class);

    // Subscription
    Route::resource('/subscription', SubscriptionController::class);

    // Invoice
    Route::resource('/invoice', InvoiceController::class);
    // Report
    Route::resource('/report', ReportController::class);

    // Settings
    Route::prefix('setting')->group( function () {
      Route::resource('/billing', SettingController::class);
      Route::resource('/mikrotik', MikrotikController::class);
      Route::resource('/user', UserController::class);

      // Setting Test
      Route::get('/custom', [SettingController::class, 'testing'])->name('setting.custom');
    });
});

require __DIR__.'/auth.php';
