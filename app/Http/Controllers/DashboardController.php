<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{

  public function index()
  {

    $subs = Subscription::with('customer:id,user_id')
            ->when(Auth::user()->level === 'operator', function($q) {
                $q->whereHas('customer', function($w) {
                    $w->where('user_id', Auth::user()->id);
                    });
                })
            ->where('status', '!=','nonactive')
            ->get();

    $totalsubs = $subs->count();
    $totalppp = $subs->where('type', 'ppp')->count();
    $totalstatic = $subs->where('type', 'static')->count();

    $paidppp = Subscription::where('status', '!=','nonactive')->where('type', 'ppp')
                ->when(Auth::user()->level === 'operator', function($q) {
                    $q->whereHas('customer', function($w) {
                        $w->where('user_id', Auth::user()->id);
                        });
                    })
                ->whereHas('transaction', function($q) {
                $q->whereMonth('created_at', now()->month)
                ->where('status', 'paid');})->count();

    $paidstatic = Subscription::where('status', '!=','nonactive')->where('type', 'static')
                    ->when(Auth::user()->level === 'operator', function($q) {
                        $q->whereHas('customer', function($w) {
                            $w->where('user_id', Auth::user()->id);
                            });
                        })
                    ->whereHas('transaction', function($q) {
                    $q->whereMonth('created_at', now()->month)
                    ->where('status', 'paid');})->count();

    //Monthly earning & debt
    $totaltrans = Transaction::with('subscription', 'subscription.customer:id,name')
                    ->when(Auth::user()->level === 'operator', function($q) {
                        $q->whereHas('subscription.customer', function($w) {
                            $w->where('user_id', Auth::user()->id);
                            });
                        })
                    ->whereMonth('date', now()->month)
                    ->get();

    // $transLatest = $totaltrans->where('status', 'paid')->sortByDesc('updated_at')->take(20);
    $earnmonthppp = $totaltrans->where('status', 'paid')
            ->where('subscription.type', 'ppp')->sum('total');
    $debtmonthppp = $totaltrans->where('status', 'unpaid')
            ->where('subscription.type', 'ppp')->sum('total');
    $earnmonthstatic = $totaltrans->where('status', 'paid')
            ->where('subscription.type', 'static')->sum('total');
    $debtmonthstatic = $totaltrans->where('status', 'unpaid')
            ->where('subscription.type', 'static')->sum('total');

    $earnmonth = $totaltrans->where('status', 'paid')->sum('total');
    $earncash = $totaltrans->where('status', 'paid')->where('method', 'cash')->sum('total');
    $earntransfer = $totaltrans->where('status', 'paid')->where('method', 'transfer')->sum('total');

    $comm = Auth::user()->commission->where('created_at', '>=', now()->startOfMonth())->sum('amount');

    return Inertia::render('Dashboard/Index', [
        'totalsubs' => $totalsubs,
        'comm' => $comm,
        'substype' => [
            [
                'type' => 'PPP', 'total' => $totalppp, 'paid' => $paidppp, 'icon' => 'mdi-react',
                'earn' => $earnmonthppp, 'debt' => $debtmonthppp,
            ],
            [
                'type' => 'STATIC', 'total' => $totalstatic, 'paid' => $paidstatic, 'icon' => 'mdi-webhook',
                'earn' => $earnmonthstatic, 'debt' => $debtmonthstatic,
            ],
        ],
        'monthly' => [
            'earnmonth' => $earnmonth,
            'earncash' => $earncash,
            'earntransfer' => $earntransfer,
        ],
    ]);
  }

}
