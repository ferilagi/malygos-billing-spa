<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $subscription = Subscription::where('customer_id', $request->customerid)->first();
        $invoices = $subscription->transaction->sortByDesc('updated_at');

        return response()->json([
            'success' => true,
            'invoices' => $invoices,
            'statusCode' => 200
        ]);
    }
}
