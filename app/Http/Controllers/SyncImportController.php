<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Customer;
use App\Models\Mikrotik;
use App\Models\ServicePpp;
use App\Models\ServiceStatic;
use App\Models\Subscription;
use App\Models\User;
use App\Notifications\CrudNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use RouterOS\Client;
use RouterOS\Config;
use RouterOS\Exceptions\ConnectException;
use RouterOS\Query;

class SyncImportController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Index Sync PPP Secret Group Function.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $pak = ServicePpp::all('id','name_prof');
        $sak = ServiceStatic::all('id','name_prof');
        $ar = Area::all('id','name');
        $routers = Mikrotik::where('is_active', 1)->get();
        $users = [];

        if ($request->router && $request->type) {
            if ($request->type == 'ppp') {
                $router = $request->router;
                $users = $this->pppUserApi($router);
            }

            if ($request->type == 'static') {
                $router = $request->router;
                $users = $this->staticUserApi($router);
            }
        }

        return Inertia::render('Sync/Index', [
            'routers' => $routers,
            'ar' => $ar,
            'pak' => $pak,
            'sak' => $sak,
            'users' => $users,
        ]);
    }


    /**
     * Sync PPP Secret Group Function.
     *
     * @return \Illuminate\Http\Response
     */

    public function pppUser()
    {
        $pak = ServicePpp::all('id','name_prof');
        $ar = Area::all('id','name');
        $routers = Mikrotik::where('is_active', 1)->get();
        return view ('sync.syncPppUser', compact('routers', 'pak', 'ar'));
    }

    public function pppUserApi($router)
    {
        $mikrotik = Mikrotik::where('name', $router)->first();
        $config =
            (new Config())
                ->set('host', $mikrotik->{'ip_addr'})
                ->set('port', $mikrotik->{'port'})
                ->set('pass', $mikrotik->{'pass'})
                ->set('user', $mikrotik->{'user'});
        if($mikrotik){
			try {
                $client = new Client($config);
            } catch (ConnectException $e) {
                die('Unable to connect to the router.');
                return redirect()->back()->with([
                    'message' => [
                        'status' => 'error',
                        'text' => 'Unable to connect to the router.',
                    ]
                ]);
            }
            $query = new Query('/ppp/secret/print');

            // Send query and read response from RouterOS
            $responses = $client->query($query)->read();
            if (!$responses) {
                return back()->with([
                    'message' => [
                        'status' => 'error',
                        'text' => 'No PPP User in Mikrotik',
                    ]
                ]);
            }

            $collection = collect($responses);

            // Return Data Not Activated Yet
            $exist = [];
            $subs = Subscription::whereNotNull('username')->get();
            if ($subs) {
                foreach($subs as $sub)
                { $exist[] = $sub->username; }
            }
            // Ready to Go!!!!!!!!!!!!!
            $users = $collection->whereNotIn('name', $exist);
            // $chunk = $users->take(20);
            return $users;
        } else {

            return redirect()->back()->with([
                'message' => [
                    'status' => 'error',
                    'text' => 'Mikrotik not Found in Database',
                ]
            ]);
        }

    }

    public function pppUserPost(Request $request)
    {
        $validatedData = Validator::make($request->all(),[
            'service'=> 'required',
            'name'=> 'required|unique:subscriptions,username',
            'password'=> 'required',
            'profile'=> 'required',
            'area'=> 'required',
        ]);

        if ($validatedData->fails()){
            return redirect()->back()->with([
                'message' => [
                    'status' => 'error',
                    'text' => $validatedData->errors()->all(),
                ]
            ]);
        }

        if ($request->service !== 'pppoe' && $request->service !== 'any') {
            return redirect()->back()->with([
                'message' => [
                    'status' => 'error',
                    'text' => 'User bukan jenis PPPoE',
                ]
            ]);
        }

        // Search Plan Service in Database
        $ppp = ServicePpp::where('name_prof', $request->profile)->first();
        if (!$ppp) {
            return redirect()->back()->with([
                'message' => [
                    'status' => 'error',
                    'text' => 'Profile not found, Sync Profile First',
                ]
            ]);
        }

        // Create New Customer
        $cust = new Customer();
        $cust->user_id = Auth::user()->id;
        $cust->name = $request->name . ' Sync User';
        $cust->phone = fake()->e164PhoneNumber();
        $cust->email = fake()->safeEmail();
        $cust->address = fake()->address();
        $cust->joined_at = now();
        $cust->lat = '-7.250445';
        $cust->lon = '112.768845';
        $cust->save();

        if ($cust) {
            // Save Synced Subscription
            $sub = new Subscription();
            $sub->integration = 1;
            $sub->customer_id = $cust->id;
            $sub->type = 'ppp';
            $sub->username = $request->name;
            $sub->password = $request->password;
            $sub->is_taxed = 0;
            $sub->auto_disable = 0;
            $sub->first_transaction = 1;
            $sub->custom_duedate = '0';
            $sub->area_id = $request->area;
            $ppp->plans()->save($sub);

            // Notification
            $nc_prime = User::first();
            $nc_subject = Auth::user()->name;
            $nc_object = $request->name;
            $nc_data = [
                'subject' => $nc_subject,
                'action' => 'Sync User',
                'status' => 'Success',
                'table' => 'Subscription',
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
                    'text' => 'Sync PPPoE User successfully, Update Customer Info!',
                ]
            ]);

        } else
        return redirect()->back()->with([
            'message' => [
                'status' => 'warning',
                'text' => 'Customer Exist!',
            ]
        ]);
    }

    /**
     * Sync PPP Profile Group Function..
     *
     * @return \Illuminate\Http\Response
     */
    public function pppProfile()
    {
        //
    }

    public function pppProfileApi()
    {
        //
    }

    /**
     * Sync Static from Queue Group Function..
     *
     * @return \Illuminate\Http\Response
     */
    public function staticUser()
    {
        $sak = ServiceStatic::all('id','name_prof');
        $ar = Area::orderBy("name", "asc")->get();
        $routers = Mikrotik::where('is_active', 1)->get();
        return view ('sync.syncStaticUser', compact('routers', 'sak', 'ar'));
    }

    public function staticUserApi($router)
    {
        $mikrotik = Mikrotik::where('name', $router)->first();
        $config =
            (new Config())
                ->set('host', $mikrotik->{'ip_addr'})
                ->set('port', $mikrotik->{'port'})
                ->set('pass', $mikrotik->{'pass'})
                ->set('user', $mikrotik->{'user'});
        if($mikrotik){
			try {
                $client = new Client($config);
            } catch (ConnectException $e) {
                die('Unable to connect to the router.');
                return back()->with('info', 'Unable to connect to the router.');
            }
            $query = new Query('/queue/simple/print');
                        $query->where('dynamic', 'false');

            // Send query and read response from RouterOS
            $responses = $client->query($query)->read();
            if (!$responses) {
                return response()->json([
                    'success' => false,
                    'message'  => 'No Queue User in Mikrotik',
                ]);
            }

            $collection = collect($responses);
        // Return Data Not Activated Yet
        $exist = [];
        $subs = Subscription::whereNotNull('ip_addr')->get();
        if ($subs) {
            foreach($subs as $sub)
            { $exist[] = $sub->ip_addr; }
        }

        // Ready to Go!!!!!!!!!!!!!
        $users = $collection->whereNotIn('target', $exist);
        // $chunk = $results->take(20);

        return $users;

        }
    }

    public function staticUserPost(Request $request)
    {
        $validatedData = Validator::make($request->all(),[
            'queuename'=> 'required',
            'target'=> 'required|unique:subscriptions,ip_addr',
            'parent'=> 'required',
            'profile'=> 'required',
            'area'=> 'required',
        ]);

        if ($validatedData->fails()){
            return redirect()->back()->with([
                'message' => [
                    'status' => 'error',
                    'text' => $validatedData->errors()->all(),
                ]
            ]);
        }

        // Search Plan Service in Database
        $static = ServiceStatic::where('id', $request->profile)->first();
        if (!$static) {
            return redirect()->back()->with([
                'message' => [
                    'status' => 'error',
                    'text' => 'Profile not found, Sync Profile First',
                ]
            ]);
        }
        if ($static->parentQueue != $request->parent) {
            return redirect()->back()->with([
                'message' => [
                    'status' => 'error',
                    'text' => 'Static User parent and Profile parent not match',
                ]
            ]);
        }


        // Create New Customer
        $cust = new Customer();
        $cust->user_id = Auth::user()->id;
        $cust->name = $request->queuename . ' Sync User';
        $cust->phone = fake()->e164PhoneNumber();
        $cust->email = fake()->safeEmail();
        $cust->address = fake()->address();
        $cust->joined_at = now();
        $cust->lat = '-7.250445';
        $cust->lon = '112.768845';
        $cust->save();

        // remove /32 from sync user

        $ip_addr_sync = str_replace(array('/32'), '',$request->target);

        if ($cust) {
            // Save Synced Subscription
            $sub = new Subscription();
            $sub->integration = 1;
            $sub->customer_id = $cust->id;
            $sub->type = 'static';
            $sub->ip_addr = $ip_addr_sync;
            $sub->queuename = $request->queuename;
            $sub->is_taxed = 0;
            $sub->auto_disable = 0;
            $sub->first_transaction = 1;
            $sub->custom_duedate = '0';
            $sub->area_id = $request->area;
            $static->plans()->save($sub);

            // Notification
            $nc_prime = User::first();
            $nc_subject = Auth::user()->name;
            $nc_object = $request->queuename;
            $nc_data = [
                'subject' => $nc_subject,
                'action' => 'Sync User',
                'status' => 'Success',
                'table' => 'Subscription',
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
                    'text' => 'Sync Static User successfully, Update Customer Info!',
                ]
            ]);

        } else
        return redirect()->back()->with([
            'message' => [
                'status' => 'error',
                'text' => 'Customer Exist!',
            ]
        ]);
    }

    public function staticBinding()
    {
        # code...
    }

    public function staticBindingApi()
    {
        # code...
    }

    public function staticBindingPost()
    {
        # code...
    }
}
