<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostCollectionResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Album;
use App\Models\Competition;
use App\Models\Exhibition;
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
        $posts = Post::orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($posts);
    }
    public function getUserPosts(string $id)
    {
        $posts = Post::where('user_id', $id)->orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($posts);
    }
    public function getPostsWithoutAlbum(string $id)
    {
        $posts = Post::where('user_id', $id)->where('album_id', null)->orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($posts);
    }
    
    public function getCompetitionPosts(string $id)
    {
        $competition = Competition::findOrFail($id);
        $posts = $competition->posts()->orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($posts);
    }
    public function getExhibitionPosts(string $id)
    {
        $exhibitions = Exhibition::findOrFail($id);
        $posts = $exhibitions->posts()->orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($posts);
    }
    public function getAlbumPosts(string $id)
    {
        $album = Album::findOrFail($id);
        $posts = $album->posts()->orderBy('created_at', 'desc')->paginate(20);
        return new PostCollectionResource($posts);
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::findOrFail($id);
        return new PostResource($post);
    }
}
