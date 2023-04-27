<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $tags = Tag::all()->sortBy("tag");
        return view('user.tags.index', compact('tags'));
    }
}
