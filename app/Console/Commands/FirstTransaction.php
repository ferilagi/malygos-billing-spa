<?php

namespace App\Console\Commands;

use App\Models\Setting;
use App\Models\Subscription;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Console\Command;

class FirstTransaction extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'transaction:first';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create First Transaction of Subscriptions';

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
        $daysInMonth = $datenow->daysInMonth;
        $prorate = $daysInMonth - $datenow->day;
        if ($prorate == "0") {
            $prorate = "1";
        }
        $duedate = Carbon::now()->addDays(3);
        $y = Carbon::now()->format('y');
        $m = Carbon::now()->format('m');
        $s = Carbon::now()->format('s');
        $subs = Subscription::where('first_transaction', 1)->get();

        if ($subs) {
            foreach ($subs as $sub) {
                $proprice = $sub->planable->price / $daysInMonth;
                $subtotal = $proprice * $prorate;
                $taxtotal = 0;

                if ($sub->is_taxed == 1) {
                    $taxtotal = invTax($proprice);
                }

                Transaction::create([
                    'invoice' => $prefix . $y . $m . $s . $sub->id,
                    'sub_id' => $sub->id,
                    'name' => $sub->customer->name,
                    'subtotal' => $subtotal,
                    'taxtotal' => $taxtotal,
                    'total' => $subtotal + $taxtotal,
                    'date' => $datenow,
                    'dueDate' => $duedate,
                    'status' => 'unpaid',
                    ]
                );
                $first = Subscription::find($sub->id);
                $first->first_transaction = 0;
                $first->save();
            }
        } else
        return 0;
    }
}
