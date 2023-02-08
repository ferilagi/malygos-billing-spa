<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;

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
            ->when(Auth::user()->level === 'operator', function($q) {
                $q->whereHas('customer', function($w) {
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
                    'id'  => $subs->customer->id,
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
        return Inertia::render('Subs/Create', [
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
