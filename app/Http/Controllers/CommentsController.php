<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $comments = Comment::all()->sortBy("created_at");
        return view('user.comments.index', compact('comments'));
    }
}
