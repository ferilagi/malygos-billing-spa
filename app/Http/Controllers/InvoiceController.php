<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Setting;
use App\Models\Subscription;
use App\Models\Transaction;
use App\Models\User;
use App\Models\UserCommission;
use App\Notifications\CrudNotification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $start_date = Carbon::now()->startOfMonth()->toDateString();
        $end_date = Carbon::now()->endOfMonth()->toDateString();

        $rangePeriod = $request->query('rangePeriod');

        if ($rangePeriod) {
            $dates = explode(" to ", $rangePeriod);
            if (isset($dates[0]) && isset($dates[1])) {
                $start_date = Carbon::parse($dates[0])->toDateTimeString();
                $end_date = Carbon::parse($dates[1])->toDateTimeString();
            }
        }

        $trans = Transaction::with(
                'subscription.customer:id,user_id,name',
                'subscription.customer.user:id,name',
                'subscription.planable:id,alias'
                )
            // ->where('created_at', '>=', Carbon::now()->startOfMonth())
            ->when(Auth::user()->level === 'operator', function($q) {
                $q->whereHas('subscription.customer', function($w) {
                    $w->where('user_id', Auth::user()->id);
                    });
                })
            ->whereBetween('created_at', [$start_date, $end_date])
            ->get();

        return Inertia::render('Invoice/Index', [
            'filters' => FacadesRequest::all('search'),
            'trans' => $trans->map(fn ($tran) => [
                'id'  => $tran->invoice,
                'name'  => $tran->subscription->customer->name,
                'total'  => $tran->total,
                'status'  => $tran->status,
                'period'  => $tran->date,
                'owner'   => $tran->subscription->customer->user ? $tran->subscription->customer->user->only('name') : null,
                ]),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Transaction $invoice)
    {
        $prefix = Setting::where('setting', 'inv_prefix')->value('value');
        $comp = Company::first();

        return Inertia::render('Invoice/Show', [
            'invoice' => [
                'invoice' => $invoice->invoice,
                'name' => $invoice->subscription->customer->name,
                'phone' => $invoice->subscription->customer->phone,
                'address' => $invoice->subscription->customer->address,
                'date' => $invoice->date,
                'dueDate' => $invoice->dueDate,
                'packet' => $invoice->subscription->planable->alias,
                'subtotal' => $invoice->subtotal,
                'taxtotal' => $invoice->taxtotal,
                'total' => $invoice->total,
            ],
            'prefix' => $prefix,
            'comp' => $comp
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Transaction $trans)
    {
        $request->validate([

            'status'=> 'required',
            'method'=> 'required',
        ]);

            $trans= Transaction::where('invoice', $request->id)->first();
            //Check jika Terisolir, aktifkan
            $sub = Subscription::where('id', $trans->sub_id)->first();
            if ($sub->type == 'ppp' && $sub->status == 'isolated' && $sub->integration == '1') {
                // Prepare Variable
                $name_prof = $sub->planable->name_prof;
                $username = $sub->planable->prefixQueue . $sub->username . $sub->planable->sufixQueue;
                $mikrotik = Mikrotik::where('name', $sub->planable->routers)->first();
                // Sync to Mikrotik
                if ($mikrotik) {
                        $config =
                        (new Config())
                            ->set('host', $mikrotik->{'ip_addr'})
                            ->set('port', $mikrotik->{'port'})
                            ->set('pass', $mikrotik->{'pass'})
                            ->set('user', $mikrotik->{'user'});
                        try {
                            $client = new Client($config);
                            } catch (ConnectException $e) {
                                die('Unable to connect to the router.');
                                return response()->json(['success' => false, 'message' => 'Unable to connect to the router.']);
                            }
                                $query = new Query('/ppp/secret/set');
                                            $query->equal('.id', $username);
                                            $query->equal('profile', $name_prof);
                                            // Send query and read response from RouterOS
                                            $response = $client->query($query)->read();

                            $njlimet = $client->query('/ppp/active/print', ['name', $username])->read();
                            if ($njlimet) {
                                $oldId = $njlimet[0]['.id'];
                                $query = new Query('/ppp/active/remove');
                                            $query->equal('.id', $oldId);
                                            $response = $client->query($query)->read();
                            }
                }
                $sub->update([
                    'status' => 'active',
                ]);
            }
            if ($sub->type == 'static' && $sub->status == 'isolated' && $sub->integration == '1') {
                // Prepare Variable
                $username = $sub->planable->prefixQueue . $sub->queuename . $sub->planable->sufixQueue;
                $commentaddrlist = $sub->queuename . "@" . $sub->area->name . "_";
                $listNormal = Setting::where('setting', 'staticList_active')->value('value');
                $mikrotik = Mikrotik::where('name', $sub->planable->routers)->first();
                // Sync to Mikrotik
                if ($mikrotik) {
                        $config =
                        (new Config())
                            ->set('host', $mikrotik->{'ip_addr'})
                            ->set('port', $mikrotik->{'port'})
                            ->set('pass', $mikrotik->{'pass'})
                            ->set('user', $mikrotik->{'user'});
                        try {
                            $client = new Client($config);
                            } catch (ConnectException $e) {
                                die('Unable to connect to the router.');
                                return response()->json(['success' => false, 'message' => 'Unable to connect to the router.']);
                            }
                        $njlimet = $client->query('/ip/firewall/address-list/print', [
                                            ['address', $sub->ip_addr],
                                            ['comment', $commentaddrlist],],'|')->read();

                        // Jika di Address-List tidak ketemu
                        if (!$njlimet) {
                            return response()->json(['success' => false, 'message' => 'Failed Search IP in Address List!']);
                        }
                        $oldId = $njlimet[0]['.id'];
                                $query = new Query('/ip/firewall/address-list/set');
                                            $query->equal('.id', $oldId);
                                            $query->equal('list', $listNormal);
                                            // Send query and read response from RouterOS
                                            $response = $client->query($query)->read();
                }
                $sub->update([
                    'status' => 'active',
                ]);
            }

            $trans->update([
                "status" => $request->status,
                'method' => $request->method,]);

            // Commission
            if ($sub->planable->commission > '0') {
                $commis = new UserCommission();
                $commis->user_id = $sub->customer->user->id;
                $commis->amount = $sub->planable->commission;
                $commis->save();
            }

            // Notification
            $nc_prime = User::first();
            $nc_subject = Auth::user()->name;

            $nc_data = [
                'subject' => $nc_subject,
                'action' => 'Paid '.$request->method,
                'status' => 'Success',
                'table' => 'Transactions',
                'object' => $trans->invoice ." / ". $sub->customer->name,
            ];
            $nc_prime->notify(new CrudNotification($nc_data));

            if (Auth::user()->level != 'admin') {
                User::where('id', Auth::user()->id)
                ->firstOrFail()
                ->notify(new CrudNotification($nc_data));
            }

            return redirect()->back()->with([
                'message' => [
                    'status' => 'success',
                    'text' => $sub->customer->name . ', Status Change to Paid!',
                ]
            ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
