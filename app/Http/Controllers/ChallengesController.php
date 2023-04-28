<?php

namespace App\Http\Controllers;

use App\Models\Challenge;
use Illuminate\Http\Request;

class ChallengesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $challenges = Challenge::all()->sortBy("title");
        return view('user.challenges.index', compact('challenges'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('user.challenges.form');
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
        $challenge = Challenge::findOrFail($id);  // įvykdoma SQL užklausa, kuri išrenka vieną įrašą iš lentelės pagal ID reikšmę
        return view('user.challenges.show', compact('challenge'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $challenge = Challenge::findOrFail($id);
        return view('user.challenges.form', compact('challenge'));
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
        $challenge = Challenge::findOrFail($id);
        $challenge->delete();  // įvykdoma SQL užklausa, kuri pašalina duomenis iš DB
        return redirect('user/challenges')->with('success', 'Challenge deleted successfully.');
    }
}
