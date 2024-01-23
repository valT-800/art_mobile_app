<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\AlbumCollectionResource;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use App\Models\User;
use Illuminate\Http\Request;

class AlbumsController extends Controller
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
        $albums = Album::orderBy('updated_at','desc')->paginate(20);
        return new AlbumCollectionResource($albums);
    }
    public function getUserAlbums(string $id)
    {
        $user = User::findOrFail($id);
        $albums = $user->albums()->orderBy('updated_at','desc')->paginate(20);
        return new AlbumCollectionResource($albums);
    }
    public function getUserAlbumsShort(string $id)
    {
        $user = User::findOrFail($id);
        $albums = $user->albums()->get();
        return AlbumResource::collection($albums);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $albums = Album::findOrFail($id);
        return new AlbumResource($albums);
    }
}
