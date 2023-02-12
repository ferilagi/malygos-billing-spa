<?php

namespace App\Http\Controllers;

use App\Models\Mikrotik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MikrotikController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

      return Inertia::render('Setting/Mikrotik/Index', [
        'routers' => Mikrotik::all()
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
        $request->validate([
            'name'=> 'required|min:3|unique:mikrotiks,name,' .$request->mkt_id,
            'ip_addr'=> 'required|ipv4|unique:mikrotiks,ip_addr,' .$request->mkt_id,
            'user'=> 'required',
            'pass'=> 'required',
            'port'=> 'required',
            'description'=> 'nullable',
        ]);


        Mikrotik::updateOrCreate([
            'id' => $request->mkt_id],
            ['name' => $request->name,
            'ip_addr' => $request->ip_addr,
            'user' => $request->user,
            'pass'=>$request->pass,
            'port'=>$request->port,
            'description'=> $request->description,
            'is_active'=> 1,
            ]);

        if(empty($request->mkt_id))
			$msg = 'Mikrotik added successfully.';
		else
			$msg = 'Mikrotik update successfully.';

        return redirect()->back()->with([
            'message' => [
                'status' => 'success',
                'text' => $msg,
            ]
        ]);
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
