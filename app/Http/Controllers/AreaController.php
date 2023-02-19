<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

use function PHPSTORM_META\map;

class AreaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $areas = Area::with('subscription')->orderBy("name", "asc")->get();

        return Inertia::render('Map/Index', [
            'areas' => $areas->map(fn ($area) => [
                'id' => $area->id,
                'name' => $area->name,
                'subs' => $area->subscription->count(),
                'lat' => $area->lat,
                'lon' => $area->lon,
            ]

            ),

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
        $validatedData = Validator::make($request->all(),[
            'name'=> 'required|min:4',
            'lat'=> 'required',
            'lon'=> 'required',
        ]);

        if ($validatedData->fails()){
            return redirect()->back()->with([
                'message' => [
                    'status' => 'error',
                    'text' => $validatedData->errors()->toJson(),
                ]
            ]);

        }

        $areaId = $request->area_id;
        Area::updateOrCreate([
            'id' => $areaId],
            [
            'name' => $request->name,
            'lat' => $request->lat,
            'lon' => $request->lon,
            ]);

        if(empty($request->area_id)) {
			$msg = 'Area created successfully.';
		}else {
			$msg = 'Area update successfully.';
        }

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
