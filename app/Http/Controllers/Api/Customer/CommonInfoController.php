<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

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
     * Api EndPoint for getting Initial Data.
     */
    public function mydata(Request $request)
    {
        $customer =  $request->user();
        $subscription = $customer->subscription;
        // check if has transaction
        $latest_invoice = $subscription->latestTransaction;
        if (!$latest_invoice) {
            $latest_invoice = [];
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
     * Api EndPoint for getting Invoices each Customer.
     */
    public function myinvoice(Request $request)
    {
        $customer =  $request->user();
        $invoices = $customer->subscription->transaction->sortByDesc('created_at');

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
