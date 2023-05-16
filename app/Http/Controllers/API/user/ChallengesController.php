<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChallengeResource;
use App\Models\Challenge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChallengesController extends Controller
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
        $challenges = Challenge::with('images')->get();
        return ChallengeResource::collection($challenges);
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
        $challenge = new Challenge([
            'title' => $request->title,
            'description' => $request->description
        ]);
        $challenge->save();

        return response()->json(['isSuccess' => true, 'message' => 'Succesfully posted']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $challenges = Challenge::with('images')->findOrFail($id);
        return new ChallengeResource($challenges);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $challenge = Challenge::findOrFail($id);
        $challenge->update($request->all());
        return new ChallengeResource($challenge);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $challenge = Challenge::findOrFail($id);
        $challenge->delete();
    }
}
