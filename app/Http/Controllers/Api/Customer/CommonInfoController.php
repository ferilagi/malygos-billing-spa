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

        // Check if has transaction
        $latest_invoice = $customer->subscription->latestTransaction;
        if ($latest_invoice) {
            $latest_invoice = [
                'invoice'  => $latest_invoice->invoice,
                'name'  => $latest_invoice->name,
                'status'  => $latest_invoice->status == 'paid' ? 'lunas' : 'belum lunas',
                'method'  => $latest_invoice->method,
                'subtotal'  => $latest_invoice->subtotal,
                'taxtotal'  => $latest_invoice->taxtotal,
                'total'  => $latest_invoice->total,
                'date'  => $latest_invoice->date,
                'dueDate'  => $latest_invoice->dueDate,
            ];
        } else {
            $latest_invoice = [];
        }

        // Format Packet
        $plan = $customer->subscription->planable;
        if ($plan) {
            $plan = [
                'name_prof' => $plan->name_prof,
                // 'rateLimit' => $plan->rateLimit,
                'price' => $plan->price,
                'spelled' => $plan->spelled,
                'alias' => $plan->alias,
            ];
        }

        if ($customer->subscription) {
            return response()->json([
                'success' => true,
                'data' => [
                    'type' => $customer->subscription->type,
                    'status' => $customer->subscription->status,
                    'lastInvoice' => $latest_invoice,
                    'plan' => $plan,
                ]
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Maaf anda belum Berlangganan'
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
                'data' => $invoices->map(fn ($invoice) => [
                    'invoice'  => $invoice->invoice,
                    'name'  => $invoice->name,
                    'status'  => $invoice->status == 'paid' ? 'lunas' : 'belum lunas',
                    'method'  => $invoice->method,
                    'subtotal'  => $invoice->subtotal,
                    'taxtotal'  => $invoice->taxtotal,
                    'total'  => $invoice->total,
                    'date'  => $invoice->date,
                    'dueDate, '  => $invoice->dueDate,
                    'created_at, '  => $invoice->created_at,
                ]),
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Maaf tidak ada invoice',
            ]);
        }
    }

    /**
     * Api EndPoint for getting Notification each Customer.
     */
    public function mynotification(Request $request)
    {
        $customer =  $request->user();
        $notifications = $customer->notifications;


        return response()->json([
            'success' => true,
            'data' => $notifications->map(fn ($notif) => [
                'id' => $notif->id,
                'notif' => $notif->data,
                'read_at' => $notif->read_at,
                'created_at' => $notif->created_at,
            ]),
        ]);
    }

    /**
     * Api EndPoint for getting Internet Status each Customer.
     */
    public function myconnection(Request $request)
    {
        $user =  $request->user();
        return response()->json([
            'success' => true,
            'message' => 'Normal',
        ]);
    }
}
