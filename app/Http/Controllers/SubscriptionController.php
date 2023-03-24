<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Customer;
use App\Models\Mikrotik;
use App\Models\ServicePpp;
use App\Models\ServiceStatic;
use App\Models\Setting;
use App\Models\Subscription;
use App\Models\User;
use App\Notifications\CrudNotification;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use RouterOS\Client;
use RouterOS\Config;
use RouterOS\Exceptions\ConnectException;
use RouterOS\Query;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subs = Subscription::with(
            'customer',
            'customer.user:id,name',
            'planable:id,name_prof,price',
            'area'
        )
            ->when(Auth::user()->level === 'operator', function ($q) {
                $q->whereHas('customer', function ($w) {
                    $w->where('user_id', Auth::user()->id);
                });
            })
            //   ->filter(Request::only('search'))
            //   ->paginate()
            //   ->withQueryString()
            //   ->through(fn ($subs) => [
            ->get();

        return Inertia::render('Subscription/Index', [
            'filters' => FacadesRequest::all('search'),
            'subs' => $subs->map(fn ($subs,) => [
                'id'  => $subs->id,
                'name'  => $subs->customer->name,
                'type'  => $subs->type,
                'status'  => $subs->status,
                'plan'  => $subs->planable->name_prof,
                'owner'   => $subs->customer->user ? $subs->customer->user->only('name') : null,
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
        return Inertia::render('Subscription/Create', [
            'cust' => Customer::select('id', 'name')->doesntHave("subscription")->get(),
            'areas' => Area::all('id', 'name'),
            'pprofile' => ServicePpp::all('id', 'name_prof'),
            'sprofile' => ServiceStatic::all('id', 'name_prof'),
        ]);
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
    public function show(Subscription $subscription)
    {

        return Inertia::render('Subscription/Show', [
            'subs' => [
                'name' => $subscription->customer->name,
                'phone' => $subscription->customer->phone,
                'email' => $subscription->customer->email,
                'address' => $subscription->customer->address,
                'type' => $subscription->type,
                'status' => $subscription->status,
                'integration' => $subscription->integration,
            ],
            'trans' => $subscription->transaction->sortByDesc('created_at'),
            'trans_count' => [
                'paid' => $subscription->transaction->where('status', 'paid')->count(),
                'total' => $subscription->transaction->count(),
            ],
            // 'area' => Area::all('id','name'),
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
     * Change Status the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function changeStatus(Request $request)
    {

        $validatedData = Validator::make($request->all(), [
            'sub_id' => 'required',
            'sub_status' => 'required',
        ]);
        if ($validatedData->fails()) {
            return back()->with('error', $validatedData->errors()->toJson());
        }

        $id = $request->sub_id;
        $status = $request->sub_status;
        $sub = Subscription::where('id', $id)->first();
        // dd($sub->integration);

        if ($sub->status == $status) {
            // return response()->json(['success' => false, 'message' => 'Already in '.$status.' Status']);
            return redirect()->back()->with([
                'message' => [
                    'status' => 'warning',
                    'text' => 'Already in ' . $status . ' Status',
                ]
            ]);
        }
        // Jika tida terintegrasi dengan mikrotik Batal
        if ($sub->integration == 0) {
            // return response()->json(['success' => false, 'message' => 'Subscription Using Non Integrated Mode!']);
            return redirect()->back()->with([
                'message' => [
                    'status' => 'warning',
                    'text' => 'Subscription Using Non Integrated Mode!',
                ]
            ]);
        }

        $nc_prime = User::first();
        $nc_subject = Auth::user()->name;
        $nc_object = $sub->customer->name;

        if ($sub->type == 'ppp') {
            // Prepare Variable
            $listNormal = Setting::where('setting', 'pppList_active')->value('value');
            $listIsolir = Setting::where('setting', 'pppList_isolated')->value('value');
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
                    return response()->json(['success' => false, 'message' => 'Unable to connect to the Router.']);
                }
                $query = new Query('/ppp/secret/set');
                if ($status == 'active') {
                    $query->equal('.id', $username);
                    $query->equal('profile', $name_prof);
                    // Send query and read response from RouterOS
                    $response = $client->query($query)->read();
                } elseif ($status == 'nonactive') {
                    $query->equal('.id', $username);
                    $query->equal('profile', $listIsolir);
                    // Send query and read response from RouterOS
                    $response = $client->query($query)->read();
                } elseif ($status == 'isolated') {
                    $query->equal('.id', $username);
                    $query->equal('profile', $listIsolir);
                    // Send query and read response from RouterOS
                    $response = $client->query($query)->read();
                }
                $njlimet = $client->query('/ppp/active/print', ['name', $username])->read();
                if ($njlimet) {
                    $oldId = $njlimet[0]['.id'];
                    $query = new Query('/ppp/active/remove');
                    $query->equal('.id', $oldId);
                    $response = $client->query($query)->read();
                }
                $sub->update([
                    'status' => $status,
                ]);
                $nc_data = [
                    'subject' => $nc_subject,
                    'action' => 'Change Status ' . $status,
                    'status' => 'Success',
                    'table' => 'Subscriptions',
                    'object' => $nc_object,
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
                        'text' => $sub->customer->name . ', Status Change to ' . $status,
                    ]
                ]);
            } else {
                return redirect()->back()->with([
                    'message' => [
                        'status' => 'error',
                        'text' => 'Router / Mikrotik not found',
                    ]
                ]);
            }
        } elseif ($sub->type == 'static') {
            // Prepare Variable
            $username = $sub->planable->prefixQueue . $sub->queuename . $sub->planable->sufixQueue;
            $commentaddrlist = $sub->queuename . "@" . $sub->area->name . "_";
            $listNormal = Setting::where('setting', 'staticList_active')->value('value');
            $listIsolir = Setting::where('setting', 'staticList_isolated')->value('value');
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
                    return response()->json(['success' => false, 'message' => 'Unable to connect to the Router.']);
                }
                $njlimet = $client->query('/ip/firewall/address-list/print', [
                    ['address', $sub->ip_addr],
                    ['comment', $commentaddrlist],
                ], '|')->read();

                // Jika di Address-List tidak ketemu
                if (!$njlimet) {
                    if ($status == 'active') {
                        $newList = $listNormal;
                    } elseif ($status == 'isolated') {
                        $newList = $listIsolir;
                    } else {
                        return response()->json(['success' => false, 'message' => 'Failed Search IP in Address List']);
                    }

                    $query = new Query('/ip/firewall/address-list/add');
                    $query->equal('list', $newList);
                    $query->equal('address', $sub->ip_addr);
                    $query->equal('comment', $commentaddrlist);
                    // Send query and read response from RouterOS
                    $response = $client->query($query)->read();
                } else {
                    $oldId = $njlimet[0]['.id'];
                    $query = new Query('/ip/firewall/address-list/set');
                    if ($status == 'active') {
                        $query->equal('.id', $oldId);
                        $query->equal('list', $listNormal);
                        // Send query and read response from RouterOS
                        $response = $client->query($query)->read();
                    } elseif ($status == 'nonactive') {
                        $query->equal('.id', $oldId);
                        $query->equal('list', $listIsolir);
                        // Send query and read response from RouterOS
                        $response = $client->query($query)->read();
                    } elseif ($status == 'isolated') {
                        $query->equal('.id', $oldId);
                        $query->equal('list', $listIsolir);
                        // Send query and read response from RouterOS
                        $response = $client->query($query)->read();
                    }
                }

                $sub->update([
                    'status' => $status,
                ]);
                $nc_data = [
                    'subject' => $nc_subject,
                    'action' => 'Change Status ' . $status,
                    'status' => 'Success',
                    'table' => 'Subscriptions',
                    'object' => $nc_object,
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
                        'text' => $sub->customer->name . ', Status Change to ' . $status,
                    ]
                ]);
            } else {
                return redirect()->back()->with([
                    'message' => [
                        'status' => 'success',
                        'text' => 'Router / Mikrotik not found',
                    ]
                ]);
            }
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
