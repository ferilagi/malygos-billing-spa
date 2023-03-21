<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class CustomerAuthController extends Controller
{
    /**
     * Login Function for Customer.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'devicename' => 'required',
        ]);

        $customer = Customer::where('email', $request->email)->first();

        $token = $customer->tokens;

        // if (!$customer || !Hash::check($request->password, $customer->getAuthPassword())) {
        if (!$customer || !Hash::check($request->password, $customer->login_password)) {
            return response()->json([
                'success' => false,
                'message' => [
                    'error' => 'Maaf Username / Password Salah, Silahkan coba lagi'
                ],
                'statusCode' => 401
            ]);
        }

        $token = $customer->createToken($request->devicename, ['role:customer'])->plainTextToken;
        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => $customer,
            'statusCode' => 200
        ]);
    }

    /**
     * Logout Function for Customer.
     */
    public function logout(Request $request)
    {

        // Delete customer token
        auth()->user()->currentAccessToken()->first();

        // Return response
        return response()->json([
            'success' => true,
            'message' => 'Anda telah Logout, Terima Kasih',
        ]);
    }
}
