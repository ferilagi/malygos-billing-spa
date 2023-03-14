<?php

use App\Http\Controllers\Api\Auth\AdminAuthController;
use App\Http\Controllers\Api\Auth\CustomerAuthController;
use App\Http\Controllers\Api\Customer\InvoiceController;
use App\Http\Controllers\Api\User\CustomerController as UserCustomerController;
use App\Http\Controllers\Api\User\InvoiceController as UserInvoiceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->name('api.')->middleware('auth:sanctum')->group(function () {

    // Only for User (Admin / Owner / Operator)
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::apiResource('customer', UserCustomerController::class);
        Route::apiResource('invoice', UserInvoiceController::class);
    });

    // Only for customers
    Route::middleware('type.customer')->group(function () {
        Route::apiResource('invoice', InvoiceController::class);
    });
});

Route::prefix('v1')->group(function () {
    // AdminLogin
    Route::post('admin/register', [AdminAuthController::class, 'register']);
    Route::post('admin/login', [AdminAuthController::class, 'login']);
    // CustomerLogin
    Route::post('register', [CustomerAuthController::class, 'register']);
    Route::post('login', [CustomerAuthController::class, 'login']);
});
