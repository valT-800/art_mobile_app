<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompetitionResource;
use App\Models\Competition;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompetitionsController extends Controller
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
        $competitions = Competition::with('posts')->get();
        return CompetitionResource::collection($competitions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string'
        ]);
        if ($validator->fails()) {
            return response()->json(['isSuccess' => false, 'message' => $validator->messages()]);
        }
        $competition = new Competition([
            'title' => $request->title,
            'description' => $request->description
        ]);
        $competition->save();

        return response()->json(['isSuccess' => true, 'message' => 'Succesfully posted']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $competitions = Competition::with('posts')->findOrFail($id);
        return new CompetitionResource($competitions);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $competition = Competition::with('posts')->findOrFail($id);
        if ($request->post_id) {
            $competition->posts()->sync($request->post_id);
        }
        return new CompetitionResource($competition);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $competition = Competition::findOrFail($id);
        $competition->delete();
    }
}
