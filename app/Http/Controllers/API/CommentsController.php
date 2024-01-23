<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;

class CommentsController extends Controller
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
        $comments = Comment::all();
        return CommentResource::collection($comments);
    }
    public function getPostComments(string $id)
    {
        $post = Post::find($id);
        $comments = $post->comments()->where('parent_id', null)->get();
        return CommentResource::collection($comments);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comments = Comment::findOrFail($id);
        return new CommentResource($comments);
    }
}
