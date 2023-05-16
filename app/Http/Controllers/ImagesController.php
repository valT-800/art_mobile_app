<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Image;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $images = Image::with('challenges', 'users_liked', 'users_saved', 'tags')->get();
        return view('user.images.index', compact('images'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
        $image = Image::with('tags', 'challenges', 'users_liked', 'users_saved')->findOrFail($id);  // įvykdoma SQL užklausa, kuri išrenka vieną įrašą iš lentelės pagal ID reikšmę
        return view('user.images.show', compact('image'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
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
