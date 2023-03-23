<?php

namespace App\Http\Controllers\Api\Customer;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

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
        $validator = Validator::make($request->all(), [
            'email' => 'email:rfc,dns',
            'phone' => 'numeric || min:8 || max:15',
            'address' => 'min:10 || max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ]);
        }

        $request->user()->fill($validator->validate());
        $request->user()->save();

        return response()->json([
            'success' => true,
            'user' => $request->user()
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

    public function profilePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::min(8)->mixedCase()->uncompromised()],
        ]);

        // $request->user()->update([
        //     'password' => Hash::make($validated['password']),
        // ]);

        return response()->json([
            'success' => true,
            'message' => 'Password berhasil dirubah, Silahkan Login dengan password baru'
        ]);
    }
}
