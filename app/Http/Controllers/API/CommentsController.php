<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Image;
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
        $comments = Comment::with('parent', 'comments')->get();
        return CommentResource::collection($comments);
    }
    public function getbyImageId(string $id)
    {
        $image = Image::find($id);
        $comments = $image->comments()->with('parent', 'comments')->get();
        return CommentResource::collection($comments);
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
        $comments = Comment::with('parent', 'comments')->findOrFail($id);
        return new CommentResource($comments);
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
