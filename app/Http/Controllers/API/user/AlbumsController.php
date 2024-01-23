<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\API\BaseController;
use App\Http\Controllers\Controller;
use App\Http\Resources\AlbumResource;
use App\Models\Album;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
        $albums = Album::where('user_id', Auth::id())->get();
        return AlbumResource::collection($albums);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
        'title' => 'required|string|max:191',
        ]);
        if ($validator->fails()) {
            return response()->json(['isSuccess' => false, 'message' => $validator->messages()],404);
        }
        $user = User::find(Auth::id());
        $user->albums()->create($request->all());
        return response()->json(['isSuccess' => true, 'message' => 'Album is succesfully created']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $album = Album::with('posts')->findOrFail($id);
        return new AlbumResource($album);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:191',
            ]);
            if ($validator->fails()) {
                return response()->json(['isSuccess' => false, 'message' => $validator->messages()],404);
            }
        $album = Album::findOrFail($id);
        $album->title = $request->title;
        $album->description = $request->description;
        $album->update();
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
