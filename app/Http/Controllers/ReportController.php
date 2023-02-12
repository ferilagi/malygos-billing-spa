<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;

class ReportController extends Controller
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
            // ->when($rangePeriod, function ($query) use($start_date, $end_date) {
            //     return $query->whereBetween('created_at', [$start_date, $end_date]);
            //   })
            ->get();

        $sum = $trans->sum('total');
        $negsum = $trans->where('status','unpaid')->sum('total');

      return Inertia::render('Report/Index', [
        'filters' => FacadesRequest::all('rangePeriod'),
        'trans' => $trans->map(fn ($tran) => [
                    'id'  => $tran->invoice,
                    'name'  => $tran->subscription->customer->name,
                    'type'  => $tran->subscription->type,
                    'alias'  => $tran->subscription->planable->alias,
                    'total'  => $tran->total,
                    'status'  => $tran->status,
                    'period'  => $tran->date,
                    'owner'   => $tran->subscription->customer->user ? $tran->subscription->customer->user->only('name') : null,
                  ]),
        'reports' => [
            'sum' => $sum,
            'negsum' => $negsum,
            'plussum' => $sum - $negsum,
        ],
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
