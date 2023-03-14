<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user =  $request->user();

        $customers = Customer::with('user:id,name')
            ->when($user->level === 'operator', function ($q) use ($user) {
                $q->where('user_id', $user->id);
            })
            ->get()->take(10);

        return response()->json([
            'success' => true,
            'customers' => $customers,
            'statusCode' => 200
        ]);
    }
}
