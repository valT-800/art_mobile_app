<?php

namespace App\Http\Controllers\API\gallery;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExhibitionResource;
use App\Models\Exhibition;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExhibitionController extends Controller
{

    public function __construct()
    {
        request()->headers->set('Accept', 'application/json');
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $exhibitions = Exhibition::with('posts')->where('user_id', Auth::id())->get();
        return ExhibitionResource::collection($exhibitions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::find(Auth::id());
        $user->exhibitions()->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $exhibition = Exhibition::with('posts')->findOrFail($id);
        return new ExhibitionResource($exhibition);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $exhibition = Exhibition::findOrFail($id);
        $exhibition->title = $request->title;
        $exhibition->description = $request->description;
        $exhibition->update();
        return new ExhibitionResource($exhibition);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $exhibition = Exhibition::findOrFail($id);
        $exhibition->delete();
    }
}
