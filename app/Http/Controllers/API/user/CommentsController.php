<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'post_id' => 'required|exists:posts,id',
        ]);
        if ($validator->fails()) {
            return response()->json(['isSuccess' => false, 'message' => $validator->messages()]);
        }
        $comment = Comment::create([
            'content' => $request->content,
        ]);
        if ($request->parent_id) {
            $parent = Comment::findOrFail($request->parent_id);
            $parent->comments()->save($comment);
        }
        $post = Post::findOrFail($request->post_id);
        $post->comments()->save($comment);

        $user = User::findOrFail(Auth::id());
        $user->comments()->save($comment);

        return response()->json(['isSuccess' => true, 'message' => 'Succesfully posted']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comment = Comment::with('comments')->findOrFail($id);
        return new CommentResource($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $comment = Comment::with('comments')->findOrFail($id);
        if ($request->user_liked) {
            $comment->users_liked()->sync(Auth::id());
        } else if ($request->user_unliked) {
            $comment->users_liked()->detach(Auth::id());
        }
        $comment->update();
        return new CommentResource($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = Comment::findOrFail($id);
        $comment->delete();
    }
}
