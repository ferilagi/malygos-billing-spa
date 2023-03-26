<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class CustomerAuthController extends Controller
{
    /**
     * Login Function for Customer.
     */
    public function login(Request $request)
    {
        $this->ensureIsNotRateLimited($request);

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'devicename' => 'required',
        ]);

        $customer = Customer::where('email', $request->email)->first();

        // if (!$customer || !Hash::check($request->password, $customer->getAuthPassword())) {
        if (!$customer || !Hash::check($request->password, $customer->login_password)) {
            // Jika gagal mulai throttleLimit
            RateLimiter::hit($this->throttleKey($request));

            return response()->json([
                'success' => false,
                'message' => 'Maaf Username / Password Salah, Silahkan coba lagi',
            ]);
        }

        RateLimiter::clear($this->throttleKey($request));

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


    /**
     * Ensure the login request is not rate limited.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function ensureIsNotRateLimited($request): void
    {
        if (!RateLimiter::tooManyAttempts($this->throttleKey($request), 5)) {
            return;
        }

        event(new Lockout($request));

        $seconds = RateLimiter::availableIn($this->throttleKey($request));

        throw ValidationException::withMessages([
            'email' => trans('auth.throttle', [
                'seconds' => $seconds,
                'minutes' => ceil($seconds / 60),
            ]),
        ]);
    }

    /**
     * Get the rate limiting throttle key for the request.
     */
    public function throttleKey($request): string
    {
        return Str::transliterate(Str::lower($request->email) . '|' . $request->devicename);
    }
}
