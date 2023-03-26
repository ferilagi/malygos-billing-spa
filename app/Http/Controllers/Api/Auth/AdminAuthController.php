<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
{
    /**
     * Register User From Apps.
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:4|max:255',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => 'required|confirmed|min:4',
        ]);

        if ($validator->fails()) {
            return ['success' => false, 'messages' => $validator->errors()];
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken($request->deviceName)->plainTextToken;
        event(new Registered($user));

        return response()->json([
            'success' => true,
            'token' => $token,
            'user' => $user,
        ]);
    }

    /**
     * Login User From Apps.
     */

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'devicename' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if ($user && Hash::check($request->password, $user->password)) {
            $token = $user->createToken($request->devicename)->plainTextToken;
            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => $user,
                'statusCode' => 200
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => [
                    'error' => 'Invalid credentials'
                ],
            ]);
        };
    }

    public function logout(Request $request)
    {
        // Delete customer token
        auth()->user()->currentAccessToken()->first();

        return response()->json([
            'success' => true,
            'message' => 'Anda telah Logout, Terima Kasih',
        ]);
    }
}
