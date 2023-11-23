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
use Barryvdh\Debugbar\Facades\Debugbar;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use PhpParser\Node\Expr\FuncCall;

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
        $posts = Post::with('tags', 'competitions', 'users_liked', 'users_saved')->where('user_id', Auth::id())->orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($posts);
    }

    public function getLikedPosts()
    {
        $liked_posts = User::find(Auth::id())->liked_posts()->with('tags', 'competitions', 'users_liked', 'users_saved')->orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($liked_posts);
    }
    public function getSavedPosts()
    {
        $saved_posts = User::find(Auth::id())->saved_posts()->with('tags', 'competitions', 'users_liked', 'users_saved')->orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($saved_posts);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), ['post' => 'required|post|mimes:jpg,png,jpeg,gif,svg|max:2048']);
        if ($validator->fails()) {
            return response()->json(['isSuccess' => false, 'message' => $validator->messages()], 400);
        }
        $file = $request->file('post');
        $extension = $request->post->getClientOriginalExtension();
        $fileName = $file . '.' . uniqid() . '.' . $extension;
        $path = $file->move('posts', $fileName);
        $post = Post::create([
            'description' => $request->description,
            'url' => $path,
        ]);
        $user = User::find(Auth::id());
        $post->user()->associate($user);
        if ($request->album_id) {
            $album = Album::findOrFail($request->album_id);
            $post->album()->associate($album);
        }
        if ($request->competition_id) {
            $post->competitions()->sync($request->competition_id);
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
            $post->tags()->sync($tagIds);
        }
        $post->save();
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
        $post = Post::with('tags', 'competitions', 'users_liked', 'users_saved')->findOrFail($id);
        if ($request->edited) {
            $post->description = $request->description;
            //$post->views = $request->views;
        }

        if ($request->new_album_id) {
            if (isset($post->album)) {
                $post->album()->delete();
            }
            $newAlbum = Album::find($request->new_album_id);
            $newAlbum->posts()->save($post);
        }

        if ($request->user_liked) {
            $post->users_liked()->sync(Auth::id());
        } else if ($request->user_unliked) {
            $post->users_liked()->detach(Auth::id());
        }
        if ($request->user_saved) {
            $post->users_saved()->sync(Auth::id());
        } else if ($request->user_unsaved) {
            $post->users_saved()->detach(Auth::id());
        }
        if (isset($request->competition_id)) {
            $post->competitions()->sync($request->competition_id);
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
            $post->tags()->attach($tagIds);
        }
        //$post->update();
        return new PostResource($post);
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

        // Delete the post record from the database
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
