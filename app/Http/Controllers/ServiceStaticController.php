<?php

namespace App\Http\Controllers;

use App\Models\Mikrotik;
use App\Models\ServiceStatic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class ServiceStaticController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Plan/Static/Index', [
            'sprofiles' => ServiceStatic::all(),
            'routers' => Mikrotik::all('id', 'name'),
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

        $validatedData = Validator::make($request->all(), [
            'name' => 'required|min:4',
            'netmask' => 'required',
            'rateLimit' => 'required',
            'router' => 'required',

        ]);
        if ($validatedData->fails()) {
            return redirect()->back()->with([
                'message' => [
                    'status' => 'error',
                    'text' => $validatedData->errors()->__toString(),
                ]
            ]);
        }

        $name = $request->name;
        $alias = $request->input('alias', $name);

        $id = $request->prof_id;
        ServiceStatic::updateOrCreate(
            [
                'id' => $id
            ],
            [
                'name_prof' => $request->name,
                'ip_range' => $request->ipRange,
                'netmask' => $request->netmask,
                'limitAt' => $request->limitAt,
                'rateLimit' => $request->rateLimit,
                'burstLimit' => $request->burstLimit,
                'burstThres' => $request->burstThres,
                'burstTime' => $request->burstTime,
                'priority' => $request->priority,
                'parentQueue' => $request->parentQueue,
                'prefixQueue' => $request->prefixQueue,
                'sufixQueue' => $request->sufixQueue,
                'comment' => $request->comment,
                'price' => $request->price,
                'commission' => $request->commission,
                'spelled' => $request->spelled,
                'alias' => $alias,
                'routers' => $request->router,
            ]
        );

        if (empty($request->prof_id))
            $msg = 'Profile added successfully.';

        else
            $msg = 'Profile update successfully.';

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
