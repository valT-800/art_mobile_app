<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostCollectionResource;
use App\Http\Resources\PostResource;
use App\Models\Album;
use App\Models\Competition;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PostsController extends Controller
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
        $posts = Post::where('user_id', Auth::id())->orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($posts);
    }

    public function getLikedPosts()
    {
        $liked_posts = User::find(Auth::id())->liked_posts()->orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($liked_posts);
    }
    public function getSavedPosts()
    {
        $saved_posts = User::find(Auth::id())->saved_posts()->orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($saved_posts);
    }
    public function getFollowingUsersPosts(Request $request)
    {
        
        $user = User::findOrFail(Auth::id());

        $followingIds = $user->following()->pluck('following_id')->push($user->id);
        $paginatedPosts = Post::whereIn('user_id', $followingIds)
        ->orderBy('created_at', 'desc')
        ->paginate(10);
        
        return new PostCollectionResource($paginatedPosts);
    }
    public function checkIfLiked(string $id)
    {
        $post = Post::findOrFail($id);
        $user = $post->users_liked()->where('user_id',Auth::id());
        if($user->count() > 0)
        {return response()->json(['liked'=>true]);}
        else{ return response()->json(['liked'=>false]);}
    }
    public function checkIfSaved(string $id)
    {    
        $post = Post::findOrFail($id);
        $user = $post->users_saved()->where('user_id',Auth::id());
        if($user->count() > 0)
        {return response()->json(['saved'=>true]);}
        else{ return response()->json(['saved'=>false]);}
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), 
        ['image' => 'required|image|mimes:jpg,png,jpeg,gif,svg']
        );
        if ($validator->fails()) {
            return response()->json(['isSuccess' => false, 'message' => 'File format is incompatible'],404);
        }
        $file = $request->file('image');
        $extension = $request->image->getClientOriginalExtension();
        $fileName = $file . '.' . uniqid() . '.' . $extension;
        $path = $file->move('images', $fileName);
        $post = Post::create([
            'description' => $request->description,
            'url' => $path,
        ]);
        $user = User::find(Auth::id());
        $user->posts()->save($post);
        if ($request->album_id) {
            $album = Album::findOrFail($request->album_id);
            $album->posts()->save($post);
            $album->update();
        }
        if ($request->competition_id) {
            $competition = Competition::find($request->competition_id);
            $competition->posts()->save($post);
        }
        //$post->save();
        return response()->json(['success' => true, 'data' => $post->id], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::with('tags', 'competitions', 'users_liked', 'users_saved')->findOrFail($id);
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::findOrFail($id);
        if ($request->edited) {
            $post->description = $request->description;
        }
        $post->update();    

        if ($request->new_album_id) {
            if (isset($post->album)) {
                $post->album()->delete();
            }
            $newAlbum = Album::find($request->new_album_id);
            $newAlbum->posts()->save($post);
        }

        if ($request->user_liked) {
            $post->users_liked()->attach(Auth::id(), ['created_at' => now(), 'updated_at' => now()]);
        } else if ($request->user_unliked) {
            $post->users_liked()->detach(Auth::id());
        }
        if ($request->user_saved) {
            $post->users_saved()->attach(Auth::id(),['created_at' => now(), 'updated_at' => now()]);
        } else if ($request->user_unsaved) {
            $post->users_saved()->detach(Auth::id());
        }
        if (isset($request->competition_id)) {
            $post->competitions()->attach($request->competition_id,['created_at' => now(), 'updated_at' => now()]);
        }
        return new PostResource($post);
    }
    public function like(string $id)
    {
        $post = Post::findOrFail($id);
        $post->users_liked()->attach(Auth::id(), ['created_at' => now(), 'updated_at' => now()]);
    }
    public function unlike(string $id)
    {
        $post = Post::findOrFail($id);
        $post->users_liked()->detach(Auth::id());
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);

        // Delete the post file from local storage
        if (file_exists($post->url)) {
            unlink($post->url);
        }
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
    
}
