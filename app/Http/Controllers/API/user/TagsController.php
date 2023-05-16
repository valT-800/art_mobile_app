<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\TagResource;
use App\Models\Image;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

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
        $tags = Tag::with('images')->get();
        return TagResource::collection($tags);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tag' => ['required', 'string', Rule::unique('tags')],
            'image_id' => 'required|exists:images,id',

        ]);
        if ($validator->fails()) {
            return response()->json(['isSuccess' => false, 'message' => $validator->messages()]);
        }
        $tag = new Tag([
            'tag' => $request->tag,
        ]);

        $image = Image::findOrFail($request->image_id);
        $image->tags()->save($tag);

        return response()->json(['isSuccess' => true, 'message' => 'Succesfully posted']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tags = Tag::with('images')->findOrFail($id);
        return new TagResource($tags);
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
