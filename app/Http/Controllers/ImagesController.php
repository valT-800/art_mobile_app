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
        $images = Image::with('users_liked', 'users_saved', 'tags')->with('user')->where('id', Auth::id())->get();
        return view('user.images.index', compact('images'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $albums = Album::pluck('title', 'id');
        $albums->prepend('---Please select---', 0);     // pirmo masyvo elemento reikšmė bus '---Please select---'
        $albums->all();

        $tags = Tag::selectRaw()
            ->orderBy('tag', 'asc')
            ->pluck('tag', 'id');
        $tags->prepend('---Please select---', 0);
        $tags->all();


        return view('user.images.form', compact('albums', 'tags'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Image::create($request->all())->tags()->attach($request->tags)->challenges()->attach($request->challenges)->users_liked()->attach($request->users_liked)->users_saved()->attach($request->users_saved);
        return redirect('user/images')->with('success', 'Image added successfully.');
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
        $albums = Album::pluck('title', 'id');
        $albums->prepend('---Please select---', 0);     // pirmo masyvo elemento reikšmė bus '---Please select---'
        $albums->all();

        $tags = Tag::selectRaw()
            ->orderBy('tag', 'asc')
            ->pluck('tag', 'id');
        $tags->prepend('---Please select---', 0);
        $tags->all();

        $image = Image::findOrFail($id);

        return view('user.images.form', compact('albums', 'tags'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $image = Image::findOrFail($id);
        $image->update($request->all());
        return redirect('user/images')->with('success', 'Image updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $image = Image::findOrFail($id);
        $image->delete();  // įvykdoma SQL užklausa, kuri pašalina duomenis iš DB
        return redirect('user/images')->with('success', 'Image deleted successfully.');
    }
}
