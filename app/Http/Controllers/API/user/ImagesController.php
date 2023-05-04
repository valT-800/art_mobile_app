<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageResource;
use App\Models\Image;
use Illuminate\Http\Request;

class ImagesController extends Controller
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
        $images = Image::with('tags', 'challenges', 'users_liked', 'users_saved', 'comments', 'album', 'user')->get();
        return ImageResource::collection($images);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Image::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $image = Image::with('tags', 'challenges', 'users_liked', 'users_saved', 'comments', 'album', 'user')->findOrFail($id);
        return new ImageResource($image);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

        $image = Image::findOrFail($id);
        $image->update($request->all());
        return new ImageResource($image);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $image = Image::findOrFail($id);
        $image->delete();
    }
}
