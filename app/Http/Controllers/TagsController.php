<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class TagsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::all()->sortBy("title");
        return view('user.tags.index', compact('tags'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('user.tags.form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            [
                'first_name' => 'required|alpha',   // laukas privalomas|galima įvesti tik raides
                'middle_name' => 'nullable|alpha',  // laukas gali būti tuščias|galima įvesti tik raides
                'last_name' => 'required|alpha',
                'email' => 'required|email|unique:users',
                'gender' => 'required',
                'password' => 'required|confirmed'
                //laukui 'password_confirmation' jokių validacijų nurodyti nereikia
            ],
            [
                'first_name.required' => 'Vardas yra privalomas laukas.',
                'first_name.alpha' => 'Vardas gali būti sudarytas tik iš raidžių.'
            ]
        );

        Tag::create($request->all());    // įvykdoma SQL užklausa, kuri išsaugo duomenis DB
        // grįžtama į nuorodą 'user/tags'; sesijoje išsaugome pranešimą 'success', kurio reikšmė yra tekstas 'Tag added successfully.'

        return redirect('user/tags')->with('success', 'Tag added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tag = Tag::findOrFail($id);  // įvykdoma SQL užklausa, kuri išrenka vieną įrašą iš lentelės pagal ID reikšmę
        return view('user.tags.show', compact('tag'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $tag = Tag::findOrFail($id);
        return view('user.tags.form', compact('tag'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate(
            [
                'first_name' => 'required|alpha',   // laukas privalomas|galima įvesti tik raides
                'middle_name' => 'nullable|alpha',  // laukas gali būti tuščias|galima įvesti tik raides
                'last_name' => 'required|alpha',
                'email' => 'required|email|unique:users,email,' . $id,
                'gender' => 'required'
            ],
            [
                'first_name.required' => 'Vardas yra privalomas laukas.',
                'first_name.alpha' => 'Vardas gali būti sudarytas tik iš raidžių.'
            ]
        );

        $tag = Tag::findOrFail($id);
        $tag->update($request->all());   // įvykdoma SQL užklausa, kuri atnaujina duomenis DB

        return redirect('user/tags')->with('success', 'Tag updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tag = Tag::findOrFail($id);
        $tag->delete();  // įvykdoma SQL užklausa, kuri pašalina duomenis iš DB
        return redirect('user/tags')->with('success', 'Tag deleted successfully.');
    }
}
