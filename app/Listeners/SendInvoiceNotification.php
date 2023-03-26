<?php

namespace App\Listeners;

use App\Events\InvoiceMonthlyCreated;
use App\Notifications\InvoiceMonthlyNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendInvoiceNotification implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(InvoiceMonthlyCreated $event): void
    {

        $customer = $event->trans->subscription->customer;
        // Log::info($customer);
        $customer->notify(new InvoiceMonthlyNotification($event->trans));
    }
}
