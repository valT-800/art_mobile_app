<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
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
        $albums = Album::with('images')->get();
        return AlbumResource::collection($albums);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $albums = Album::with('images')->findOrFail($id);
        return new AlbumResource($albums);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
