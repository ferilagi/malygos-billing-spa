<?php

use App\Http\Controllers\Api\Auth\AdminAuthController;
use App\Http\Controllers\Api\Auth\CustomerAuthController;
use App\Http\Controllers\Api\Customer\CommonInfoController;
use App\Http\Controllers\Api\Customer\InvoiceController;
use App\Http\Controllers\Api\Customer\ProfileController;
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

Route::prefix('v1')->name('api.')->middleware('auth:sanctum')->group(function () {

    // Only for User (Admin / Owner / Operator)
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::apiResource('customer', UserCustomerController::class);
        Route::apiResource('invoice', UserInvoiceController::class);
    });

    // Only for customers
    Route::middleware('type.customer')->group(function () {
        // initial route for customer
        Route::get('mydata', [CommonInfoController::class, 'mydata']);
        Route::get('myinvoice', [CommonInfoController::class, 'myinvoice']);
        Route::apiResource('invoice', InvoiceController::class);
        // Update Data for Customer
        Route::patch('profile/email', [ProfileController::class, 'profileEmail']);
        Route::patch('profile/phone', [ProfileController::class, 'profilePhone']);
    });

    // logout User
    Route::post('admin/logout', [AdminAuthController::class, 'logout']);
    // logout Customer
    Route::post('logout', [CustomerAuthController::class, 'logout']);
});

Route::prefix('v1')->group(function () {
    // AdminLogin
    Route::post('admin/register', [AdminAuthController::class, 'register']);
    Route::post('admin/login', [AdminAuthController::class, 'login']);
    // CustomerLogin
    Route::post('register', [CustomerAuthController::class, 'register']);
    Route::post('login', [CustomerAuthController::class, 'login']);
});
