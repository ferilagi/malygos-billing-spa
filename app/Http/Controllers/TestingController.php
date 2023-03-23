<?php

namespace App\Http\Controllers;

use App\Events\InvoiceMonthlyCreated;
use App\Models\Setting;
use App\Models\Subscription;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class TestingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        //
    }

    public function testingEventSubscriber()
    {
        // $sub = Subscription::first();

        // $due = Setting::where('setting', 'inv_dueDate')->value('value');
        // $prefix = Setting::where('setting', 'inv_prefix')->value('value');
        // $datenow = Carbon::now();
        // $y = Carbon::now()->format('y');
        // $m = Carbon::now()->format('m');
        // $s = Carbon::now()->format('s');

        // $duedate = Carbon::now()->setDay($sub->custom_duedate);
        // $taxtotal = 0;

        // if ($sub->custom_duedate == '0') {
        //     $duedate = Carbon::now()->setDay($due);
        // }

        // if ($sub->is_taxed == 1) {
        //     $taxtotal = invTax($sub->planable->price);
        // }

        // $trans = Transaction::create([
        //     'invoice' => $prefix . $y . $m . $s . $sub->id,
        //     'sub_id' => $sub->id,
        //     'name' => $sub->customer->name,
        //     'subtotal' => $sub->planable->price,
        //     'taxtotal' => $taxtotal,
        //     'total' => $sub->planable->price + $taxtotal,
        //     'date' => $datenow,
        //     'dueDate' => $duedate,
        //     'status' => 'unpaid',
        // ]);

        // // event(new InvoiceMonthlyCreated($trans));
        // InvoiceMonthlyCreated::dispatch($trans);
    }
}
