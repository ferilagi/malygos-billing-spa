<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function profileEmail(Request $request)
    {
        // $request->validate([
        //     'email' => 'required|email',
        //     'phone' => 'required',
        //     'address' => 'required',
        //     'login_password' => 'required',
        // ]);
        $user = $request->user();

        $customer = Customer::where('email', $user->email)->first();

        if (!$customer || !Hash::check($request->password, $customer->login_password)) {
            return response()->json([
                'success' => false,
                'message' => [
                    'error' => 'Maaf Username / Password Salah, Silahkan coba lagi'
                ],
                'statusCode' => 401
            ]);
        }

        $request->user()->fill($request->validated());
        $request->user()->save();

        return response()->json([
            'success' => true,
            'user' => $request->user(),
            'statusCode' => 200
        ]);
    }

    public function profilePhone(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'phone' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'messages' => $validator->errors(), 'statusCode' => 401]);
        }

        $request->user()->fill($validator);
        $request->user()->save();

        return response()->json([
            'success' => true,
            'user' => $request->user(),
            'statusCode' => 200
        ]);
    }
}
