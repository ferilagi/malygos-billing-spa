<?php

use App\Http\Controllers\AreaController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\MikrotikController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ServicePPPController;
use App\Http\Controllers\ServiceStaticController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\SyncImportController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\File;
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


// Privacy Policy  and term and usage
Route::get('/privacy', function () {
    return File::get(public_path() . '/privacy.html');
});
Route::get('/terms-and-conditions', function () {
    return File::get(public_path() . '/terms-and-conditions.html');
});

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
    Route::post('/subscription/update/status', [SubscriptionController::class, 'changeStatus'])->name('subscription.change');

    // Import or Sync Subscription
    Route::get('/sync', [SyncImportController::class, 'index'])->name('sync.index');
    Route::post('/sync/ppp', [SyncImportController::class, 'pppUserPost'])->name('sync.ppp.store');
    Route::post('/sync/static', [SyncImportController::class, 'staticUserPost'])->name('sync.static.store');

    Route::prefix('plan')->group(function () {
        Route::resource('/ppp', ServicePPPController::class);
        Route::get('/ppp-sync', [ServicePPPController::class, 'sync'])->name('ppp.sync');
        Route::get('/ppp-syncget', [ServicePPPController::class, 'syncGet'])->name('syncGet');
        Route::resource('/static', ServiceStaticController::class);
    });

    // Invoice
    Route::resource('/invoice', InvoiceController::class);
    // Report
    Route::resource('/report', ReportController::class);

    // Notification
    Route::get('/notification', [NotificationController::class, 'index'])->name('notif.index');

    // Settings
    Route::prefix('setting')->group(function () {
        Route::resource('/billing', SettingController::class);
        Route::resource('/mikrotik', MikrotikController::class);
        Route::resource('/user', UserController::class);

        // Setting Test
        Route::get('/custom', [SettingController::class, 'testing'])->name('setting.custom');
    });

    Route::prefix('map')->group(function () {
        Route::resource('/area', AreaController::class);
        Route::get('/views', [AreaController::class, 'detailShow'])->name('detailShow');
        Route::get('/leaflet', function () {
            return view('maps.leaflet');
        });
    });
});

require __DIR__ . '/auth.php';
