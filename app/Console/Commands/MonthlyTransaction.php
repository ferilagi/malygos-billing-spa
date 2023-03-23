<?php

namespace App\Console\Commands;

use App\Events\InvoiceMonthlyCreated;
use App\Models\Setting;
use App\Models\Subscription;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MonthlyTransaction extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transaction:monthly';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate Transaction of  Active Subscriptions';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $due = Setting::where('setting', 'inv_dueDate')->value('value');
        $prefix = Setting::where('setting', 'inv_prefix')->value('value');
        $datenow = Carbon::now();
        $y = Carbon::now()->format('y');
        $m = Carbon::now()->format('m');
        $s = Carbon::now()->format('s');
        $subs = Subscription::where('status', '!=', 'nonactive')
            ->where('first_transaction', 0)
            ->get();
        if ($subs) {
            foreach ($subs as $sub) {
                $duedate = Carbon::now()->setDay($sub->custom_duedate);
                $taxtotal = 0;

                if ($sub->custom_duedate == '0') {
                    $duedate = Carbon::now()->setDay($due);
                }

                if ($sub->is_taxed == 1) {
                    $taxtotal = invTax($sub->planable->price);
                }

                $trans = Transaction::create([
                    'invoice' => $prefix . $y . $m . $s . $sub->id,
                    'sub_id' => $sub->id,
                    'name' => $sub->customer->name,
                    'subtotal' => $sub->planable->price,
                    'taxtotal' => $taxtotal,
                    'total' => $sub->planable->price + $taxtotal,
                    'date' => $datenow,
                    'dueDate' => $duedate,
                    'status' => 'unpaid',
                ]);

                // event(new InvoiceMonthlyCreated($trans));
                InvoiceMonthlyCreated::dispatch($trans);
            }
        } else
            return 0;
    }
}
