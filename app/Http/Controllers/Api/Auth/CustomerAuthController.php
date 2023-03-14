<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class CustomerAuthController extends Controller
{
    /**
     * Login Auth for Customer.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'devicename' => 'required',
        ]);

        $customer = Customer::where('email', $request->email)->first();

        if (!$customer || !Hash::check($request->password, $customer->login_password)) {
            throw ValidationException::withMessages([
                'success' => false,
                'message' => [
                    'error' => 'Invalid credentials'
                ],
                'statusCode' => 401
            ]);
        }

        $token = $customer->createToken($request->devicename)->plainTextToken;
        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => $customer,
            'statusCode' => 200
        ]);
    }
}
