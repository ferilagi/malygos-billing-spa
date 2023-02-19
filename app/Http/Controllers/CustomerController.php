<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\User;
use App\Notifications\CrudNotification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $customers = Customer::with('user:id,name')
                    ->when(Auth::user()->level === 'operator', function($q) {
                        $q->where('user_id', Auth::user()->id);
                    })
                    ->get();

        return Inertia::render('Customer/Index', [
            'filters' => FacadesRequest::all('search'),
            'customers' => $customers->map(fn ($customer) => [
                'id'  => $customer->id,
                'name'  => $customer->name,
                'phone'  => $customer->phone,
                'email'  => $customer->email,
                'address'  => $customer->address,
                'joined_at'  => Carbon::parse($customer->joined_at)->format('Y-m-d'),
                'lat'  => $customer->lat,
                'lon'  => $customer->lon,
                'owner'   => $customer->user ? $customer->user->only('name') : null,
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
      return Inertia::render('Customer/Create', [
        'filters' => FacadesRequest::all('search'),
        'customers' => Customer::with('user:id,name')
            ->get()
            ->map(fn ($customer,) => [
              'id'  => $customer->id,
              'name'  => $customer->name,
              'phone'  => $customer->phone,
              'address'  => $customer->address,
              'joined_at'  => $customer->joined_at,
              'owner'   => $customer->user ? $customer->user->only('name') : null,
            ]),

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
        $request->validate([
            'name'=> 'required|min:6|unique:customers,name,' .$request->cust_id,
            'phone'=> 'numeric|unique:customers,phone,' .$request->cust_id,
            'email'=> 'required|string|email|max:255|unique:customers,email,' .$request->cust_id,
            'address'=> 'required',
            'joined_at'=> 'required',
            // 'lat'=> 'required',
            // 'lon'=> 'required',
        ]);

        // Notification
        $nc_prime = User::first();
        $nc_subject = Auth::user()->name;
        $nc_object = $request->name;


        if(!$request->owner_id) {
            $owner_id = Auth::user()->id;
        } else{
            $owner_id = $request->owner_id;
        }
        $custId = $request->cust_id;
        Customer::updateOrCreate([
            'id' => $custId],
            ['user_id' => $owner_id,
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'address'=> $request->address,
            'joined_at'=> $request->joined_at,
            'lat' => $request->lat,
            'lon' => $request->lon,
            ]);

        if(empty($request->cust_id)){
			$msg = 'Customer created successfully.';
            $nc_action = 'Create';
		}else{
			$msg = 'Customer update successfully.';
            $nc_action = 'Update';
        }

        $nc_data = [
            'subject' => $nc_subject,
            'action' => $nc_action,
            'status' => 'Success',
            'table' => 'Customers',
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
                'text' => $msg,
            ]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return redirect()->back()->with([
            'message' => [
                'status' => 'success',
                'text' => 'Test Toast Globally!',
            ]
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
