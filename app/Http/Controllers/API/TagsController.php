<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagsController extends Controller
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
        $tags = Tag::with('posts')->get();
        return TagResource::collection($tags);
    }
    public function show(string $id)
    {
        $tags = Tag::with('posts')->findOrFail($id);
        return new TagResource($tags);
    }
}
