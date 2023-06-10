<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageCollectionResource;
use App\Http\Resources\ImageResource;
use App\Http\Resources\UserResource;
use App\Models\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
        $images = Image::with('tags', 'challenges', 'users_liked', 'users_saved')->orderBy('created_at', 'desc')->paginate(9);
        return new ImageCollectionResource($images);
    }
    public function getImagesWithoutAlbum(string $id)
    {
        $images = Image::with('tags', 'challenges', 'users_liked', 'users_saved')->where('user_id', $id)->where('album_id', null)->orderBy('created_at', 'desc')->paginate(9);
        return new ImageCollectionResource($images);
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
        $image = Image::with('tags', 'challenges', 'users_liked', 'users_saved')->findOrFail($id);
        return new ImageResource($image);
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
