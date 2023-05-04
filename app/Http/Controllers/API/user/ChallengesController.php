<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\ChallengeResource;
use App\Models\Challenge;
use Illuminate\Http\Request;

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
        Challenge::create($request->all());
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
