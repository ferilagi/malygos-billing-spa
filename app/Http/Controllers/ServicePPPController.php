<?php

namespace App\Http\Controllers;

use App\Models\Mikrotik;
use App\Models\ServicePpp;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use RouterOS\Client;
use RouterOS\Config;
use RouterOS\Exceptions\ConnectException;
use RouterOS\Query;

class ServicePPPController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Plan/PPP/Index', [
            'pprofiles' => ServicePpp::all(),
            'routers' => Mikrotik::all('id', 'name'),
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
     * Sync PPPoE Profile from Mikrotik.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function sync(Request $request)
    {
        $routers = Mikrotik::select('id', 'name')->where('is_active', true)->get();
        $profiles = [];

        if ($request->router) {

            $mikrotik = Mikrotik::where('name', $request->router)->first();
            $config =
                (new Config())
                ->set('host', $mikrotik->{'ip_addr'})
                ->set('port', $mikrotik->{'port'})
                ->set('pass', $mikrotik->{'pass'})
                ->set('user', $mikrotik->{'user'});

            if ($mikrotik) {
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
                $query = new Query('/ppp/profile/print');

                // Send query and read response from RouterOS
                $responses = $client->query($query)->read();

                if (!$responses) {
                    return back()->with([
                        'message' => [
                            'status' => 'error',
                            'text' => 'No Profile Found in Mikrotik',
                        ]
                    ]);
                }

                $collection = collect($responses);
                // Return Data Not Activated Yet
                $exist = [];
                $prof = ServicePpp::whereNotNull('name_prof')->get();
                if ($prof) {
                    foreach ($prof as $profile) {
                        $exist[] = $profile->name_prof;
                    }
                }
                // Ready to Go!!!!!!!!!!!!!
                $profiles = $collection->whereNotIn('name', $exist);
                // return response()->json(['success' => true, 'profs' => $profiles, 'mkt' =>$request->routers]);
            } else {

                return redirect()->back()->with([
                    'message' => [
                        'status' => 'error',
                        'text' => 'Mikrotik not Found in Database',
                    ]
                ]);
            }
        }

        return Inertia::render('Plan/PPP/SyncRouter', [
            'routers' => $routers,
            'profiles' => $profiles
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
        $validatedData = Validator::make($request->all(), [
            'name' => 'required|min:4',
            'remoteAddress' => 'required',
            'rateLimit' => 'required',
            'router' => 'required',

        ]);

        if ($validatedData->fails()) {
            return redirect()->back()->with([
                'message' => [
                    'status' => 'error',
                    'text' => $validatedData->errors()->__toString(),
                ]
            ]);
        }

        $prof_id = $request->input('prof_id');
        $name = $request->input('name');
        $remoteAddress = $request->input('remoteAddress');
        $localAddress = $request->input('localAddress', $remoteAddress);
        $rateLimit = $request->input('rateLimit');
        $parentQueue = $request->input('parentQueue');
        $onlyOne = $request->input('onlyOne');
        $onUp = $request->input('onUp');
        $onDown = $request->input('onDown');
        $prefixQueue = $request->input('prefixQueue');
        $sufixQueue = $request->input('sufixQueue');
        $comment = $request->input('comment');
        $price = $request->input('price', 0);
        $commission = $request->input('commission', 0);
        $spelled = $request->input('spelled', 'Kosong');
        $alias = $request->input('alias', $name);
        $routers = $request->input('router');

        $msg = '';

        $mikrotik = Mikrotik::where('name', $routers)->first();
        $listNormal = Setting::where('id', 8)->first();
        $config =
            (new Config())
            ->set('host', $mikrotik->{'ip_addr'})
            ->set('port', $mikrotik->{'port'})
            ->set('pass', $mikrotik->{'pass'})
            ->set('user', $mikrotik->{'user'});

        if ($prof_id) {
            if ($msg == '') {
                try {
                    $client = new Client($config);
                } catch (ConnectException $e) {
                    die('Unable to connect to the router.');
                    // return redirect()->route('mikrotik')->with('info', $e);
                    return redirect()->back()->with([
                        'message' => [
                            'status' => 'error',
                            'text' => $e,
                        ]
                    ]);
                }
                $query = new Query('/ppp/profile/set');
                $query->equal('name', $name);
                $query->equal('local-address', $localAddress);
                $query->equal('remote-address', $remoteAddress);
                $query->equal('address-list', $listNormal->value);
                $query->equal('rate-limit', $rateLimit);
                $query->equal('parent-queue', $parentQueue);
                $query->equal('only-one', $onlyOne);
                if ($onUp) {
                    $query->equal('on-up', $onUp);
                }
                if ($onDown) {
                    $query->equal('on-down', $onDown);
                }
                if ($comment) {
                    $query->equal('comment', $comment);
                }
                // Send query and read response from RouterOS
                $response = $client->query($query)->read();

                $prof = ServicePpp::find($prof_id);
                $prof->name_prof = $name;
                $prof->localAddress = $localAddress;
                $prof->remoteAddress = $remoteAddress;
                $prof->rateLimit = $rateLimit;
                $prof->parentQueue = $parentQueue;
                $prof->addressList = $listNormal->value;
                $prof->onlyOne = $onlyOne;
                $prof->onUp = $onUp;
                $prof->onDown = $onDown;
                $prof->prefixQueue = $prefixQueue;
                $prof->sufixQueue = $sufixQueue;
                $prof->comment = $comment;
                $prof->price = $price;
                $prof->commission = $commission;
                $prof->spelled = $spelled;
                $prof->alias = $alias;
                $prof->routers = $routers;
                $prof->update();

                return redirect()->back()->with([
                    'message' => [
                        'status' => 'success',
                        'text' => 'Profile Update successfully!',
                    ]
                ]);
            } else {

                return redirect()->back()->with([
                    'message' => [
                        'status' => 'error',
                        'text' => 'Profile Update failed!',
                    ]
                ]);
            }
        } else {

            $d = ServicePpp::where('name_prof', $name)->first();
            if ($d) {
                return back()->with('error', 'Profile Already Exist');
            }
            if ($msg == '') {
                try {
                    $client = new Client($config);
                } catch (ConnectException $e) {
                    die('Unable to connect to the router.');
                    return redirect()->route('mikrotik')->with('info', $e);
                }
                $query = new Query('/ppp/profile/print');
                $query->where('name', $name);
                $resp = $client->query($query)->read();
                if ($resp) {
                    ServicePpp::create([
                        'name_prof' => $name,
                        'localAddress' => $localAddress,
                        'remoteAddress' => $remoteAddress,
                        'rateLimit' => $rateLimit,
                        'parentQueue' => $parentQueue,
                        'addressList' => $listNormal->value,
                        'onlyOne' => $onlyOne,
                        'onUp' => $onUp,
                        'onDown' => $onDown,
                        'prefixQueue' => $prefixQueue,
                        'sufixQueue' => $sufixQueue,
                        'comment' => $comment,
                        'price' => $price,
                        'commission' => $commission,
                        'spelled' => $spelled,
                        'alias' => $alias,
                        'routers' => $routers,
                    ]);
                    return redirect()->back()->with([
                        'message' => [
                            'status' => 'success',
                            'text' => 'Profile Sync successfully!',
                        ]
                    ]);
                } else {
                    $query = new Query('/ppp/profile/add');
                    $query->equal('name', $name);
                    $query->equal('local-address', $localAddress);
                    $query->equal('remote-address', $remoteAddress);
                    $query->equal('address-list', $listNormal->value);
                    $query->equal('rate-limit', $rateLimit);
                    $query->equal('parent-queue', $parentQueue);
                    $query->equal('only-one', $onlyOne);
                    if ($onUp) {
                        $query->equal('on-up', $onUp);
                    }
                    if ($onDown) {
                        $query->equal('on-down', $onDown);
                    }
                    if ($comment) {
                        $query->equal('comment', $comment);
                    }
                    // Send query and read response from RouterOS
                    $response = $client->query($query)->read();

                    ServicePpp::create([
                        'name_prof' => $name,
                        'localAddress' => $localAddress,
                        'remoteAddress' => $remoteAddress,
                        'rateLimit' => $rateLimit,
                        'parentQueue' => $parentQueue,
                        'addressList' => $listNormal->value,
                        'onlyOne' => $onlyOne,
                        'onUp' => $onUp,
                        'onDown' => $onDown,
                        'prefixQueue' => $prefixQueue,
                        'sufixQueue' => $sufixQueue,
                        'comment' => $comment,
                        'price' => $price,
                        'commission' => $commission,
                        'spelled' => $spelled,
                        'alias' => $alias,
                        'routers' => $routers,
                    ]);
                    return redirect()->back()->with([
                        'message' => [
                            'status' => 'success',
                            'text' => 'Profile Add successfully!',
                        ]
                    ]);
                }
            } else {
                return redirect()->back()->with([
                    'message' => [
                        'status' => 'error',
                        'text' => 'Something went wrong!',
                    ]
                ]);
            }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
