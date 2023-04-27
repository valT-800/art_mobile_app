<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use Illuminate\Http\Request;

class ChallengesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $challenges = Challenge::all()->sortBy("title");
        return view('user.challenges.index', compact('challenges'));
    }
}
