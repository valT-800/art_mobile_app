<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageResource;
use App\Models\Album;
use App\Models\Image;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

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

        $images = Image::with('tags', 'challenges', 'users_liked', 'users_saved')->where('user_id', Auth::id())->get();
        return ImageResource::collection($images);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        /*$validator = Validator::make($request->all(), ['image' => ['required', File::image()->max(2 * 1024)]]);
        if ($validator->fails()) return response()->json($validator->messages());*/
        $path = $request->file('image')->store('images');
        Image::create([
            //'description' => $request->description,
            'url' => $path,
        ]);
        //$album = $request->album() ?  $request->album() : Album::first();

        //$album->images()->save($image);

        return response()->json(['isSuccess' => true, 'url' => $path]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $image = Image::with('tags', 'challenges', 'users_liked', 'users_saved', 'comments')->findOrFail($id);
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
