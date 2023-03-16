<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CommonInfoController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        //
    }

    /**
     * Api resource for getting Initial Data.
     */
    public function mydata(Request $request)
    {
        $customer =  $request->user();
        $subscription = $customer->subscription;
        // check if has transaction
        $latest_invoice = $subscription->latestTransaction;
        if (!$latest_invoice) {
            return $latest_invoice = [];
        }

        if ($subscription) {
            return response()->json([
                'success' => true,
                'mydata' => [
                    'type' => $subscription->type,
                    'status' => $subscription->status,
                    'lastInvoice' => $latest_invoice,
                    'plan' => $subscription->planable,
                ],
                'statusCode' => 200
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => [
                    'error' => 'Maaf anda belum Berlangganan'
                ],
                'statusCode' => 401
            ]);
        }
    }

    /**
     * Api resource for getting Invoices each Customer.
     */
    public function myinvoice(Request $request)
    {
        $customer =  $request->user();
        $invoices = $customer->subscription->transaction;

        if ($invoices) {
            return response()->json([
                'success' => true,
                'myinvoices' => $invoices,
                'statusCode' => 200
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => [
                    'error' => 'Maaf tidak ada invoice'
                ],
                'statusCode' => 401
            ]);
        }
    }

    public function otherdata(Request $request): Response
    {
        $user =  $request->user();
    }
}
