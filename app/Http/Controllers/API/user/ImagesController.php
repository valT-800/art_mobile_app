<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageCollectionResource;
use App\Http\Resources\ImageResource;
use App\Models\Album;
use App\Models\Challenge;
use App\Models\Image;
use App\Models\Tag;
use App\Models\User;
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use PhpParser\Node\Expr\FuncCall;

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
        $images = Image::with('tags', 'challenges', 'users_liked', 'users_saved')->where('user_id', Auth::id())->orderBy('created_at', 'desc')->paginate(20);
        return new ImageCollectionResource($images);
    }

    public function getLikedImages()
    {
        $liked_images = User::find(Auth::id())->liked_images()->with('tags', 'challenges', 'users_liked', 'users_saved')->orderBy('created_at', 'desc')->paginate(20);
        return new ImageCollectionResource($liked_images);
    }
    public function getSavedImages()
    {
        $liked_images = User::find(Auth::id())->liked_images()->with('tags', 'challenges', 'users_liked', 'users_saved')->orderBy('created_at', 'desc')->paginate(20);
        return new ImageCollectionResource($liked_images);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), ['image' => 'required|image|mimes:jpg,png,jpeg,gif,svg|max:2048']);
        if ($validator->fails()) {
            return response()->json(['isSuccess' => false, 'message' => $validator->messages()], 400);
        }
        $file = $request->file('image');
        $extension = $request->image->getClientOriginalExtension();
        $fileName = $file . '.' . uniqid() . '.' . $extension;
        $path = $file->move('images', $fileName);
        $image = Image::create([
            'description' => $request->description,
            'url' => $path,
        ]);
        $user = User::find(Auth::id());
        $image->user()->associate($user);
        if ($request->album_id) {
            $album = Album::findOrFail($request->album_id);
            $image->album()->associate($album);
        }
        if ($request->challenge_id) {
            $image->challenges()->sync($request->challenge_id);
        }


        if ($request->input('tags')) {
            $tags = $request->input('tags');
            $tagIds = [];

            foreach ($tags as $item) {
                $tag = Tag::where('tag', $item)->first();
                if (!$tag) {
                    $validator = Validator::make($item, [
                        'tag' => ['required', 'string', 'max:100', Rule::unique('tags')],
                    ]);
                    if ($validator->fails()) {
                        return response()->json(['isSuccess' => false, 'message' => $validator->messages()]);
                    }
                    $tag = Tag::create(['tag' => $item]);
                }
                $tagIds[] = $tag->id;
            }
            $image->tags()->sync($tagIds);
        }
        $image->save();
        return response()->json(['success' => true, 'data' => $image->id], 200);
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
        $image = Image::with('tags', 'challenges', 'users_liked', 'users_saved')->findOrFail($id);
        if ($request->edited) {
            $image->description = $request->description;
            //$image->views = $request->views;
        }


        if ($request->new_album_id) {
            if (isset($image->album)) {
                $image->album()->delete();
            }
            $newAlbum = Album::find($request->new_album_id);
            $newAlbum->images()->save($image);
        }

        if ($request->user_liked) {
            $image->users_liked()->sync(Auth::id());
        } else if ($request->user_unliked) {
            $image->users_liked()->detach(Auth::id());
        }
        if ($request->user_saved) {
            $image->users_saved()->sync(Auth::id());
        } else if ($request->user_unsaved) {
            $image->users_saved()->detach(Auth::id());
        }
        if (isset($request->challenge_id)) {
            $image->challenges()->sync($request->challenge_id);
        }

        if ($request->tags && is_array($request->tags)) {
            $tagIds = [];
            foreach ($request->tags as $item) {
                $tag = Tag::where('tag', $item)->first();
                if (!$tag) {
                    $validator = Validator::make($item, [
                        'tag' => ['required', 'string', 'max:100', Rule::unique('tags')],
                    ]);
                    if ($validator->fails()) {
                        return response()->json(['isSuccess' => false, 'message' => $validator->messages()]);
                    }
                    $tag = Tag::create(['tag' => $item]);
                }
                $tagIds[] = $tag->id;
            }
            $image->tags()->attach($tagIds);
        }
        $image->update();
        return new ImageResource($image);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $image = Image::findOrFail($id);

        // Delete the image file from local storage
        if (file_exists($image->url)) {
            unlink($image->url);
        }

        // Delete the image record from the database
        $image->delete();

        return response()->json(['message' => 'Image deleted successfully']);
    }
}
