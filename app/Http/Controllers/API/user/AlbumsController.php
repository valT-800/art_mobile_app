<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\API\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AlbumsController extends BaseController
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
        $albums = Album::with('images')->where('user_id', Auth::id())->get();
        return AlbumResource::collection($albums);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::find(Auth::id());
        $user->albums()->create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $album = Album::with('images')->findOrFail($id);
        return new AlbumResource($album);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $album = Album::findOrFail($id);
        $album->update($request->all());
        return new AlbumResource($album);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $album = Album::findOrFail($id);
        $album->delete();
    }
}
