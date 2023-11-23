<?php

namespace App\Http\Controllers\user;

use App\Http\Controllers\Controller;
use App\Models\Album;
use App\Models\Post;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('users_liked', 'users_saved', 'tags')->get();
        return view('user.posts.index', compact('posts'));
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


        return view('user.posts.form', compact('albums', 'tags'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Post::create($request->all())->tags()->attach($request->tags)->competitions()->attach($request->competitions)->users_liked()->attach($request->users_liked)->users_saved()->attach($request->users_saved);
        return redirect('user/posts')->with('success', 'Post added successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::with('tags', 'competitions', 'users_liked', 'users_saved')->findOrFail($id);  // įvykdoma SQL užklausa, kuri išrenka vieną įrašą iš lentelės pagal ID reikšmę
        return view('user.posts.show', compact('post'));
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

        $post = Post::findOrFail($id);

        return view('user.posts.form', compact('albums', 'tags'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $post = Post::findOrFail($id);
        $post->update($request->all());
        return redirect('user/posts')->with('success', 'Post updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);
        $post->delete();  // įvykdoma SQL užklausa, kuri pašalina duomenis iš DB
        return redirect('user/posts')->with('success', 'Post deleted successfully.');
    }
}
