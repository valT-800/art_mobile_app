<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostCollectionResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
        $posts = Post::with('tags', 'competitions', 'users_liked', 'users_saved')->orderBy('created_at', 'desc')->paginate(9);
        return new PostCollectionResource($posts);
    }
    public function getPostsWithoutAlbum(string $id)
    {
        $posts = Post::with('tags', 'competitions', 'users_liked', 'users_saved')->where('user_id', $id)->where('album_id', null)->orderBy('created_at', 'desc')->paginate(9);
        return new PostCollectionResource($posts);
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
        $post = Post::with('tags', 'competitions', 'users_liked', 'users_saved')->findOrFail($id);
        return new PostResource($post);
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
