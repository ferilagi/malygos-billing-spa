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
use Illuminate\Support\Facades\Password;

class AuthController extends Controller
{
    /**
     * Register User From Apps.
     */
    public function register(Request $request): Response
    {
        $request->validate([
            'name' => 'required|string|min:4|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Password::min(6)],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $token = $user->createToken($request->deviceName)->plainTextToken;
        event(new Registered($user));

        return response()->json([
            'status' => 'success',
            'token' => $token,
            'user' => $user,
        ]);


    }

     /**
     * Register User From Apps.
     */

    public function login(LoginRequest $request): Response
    {
        //
    }

}
