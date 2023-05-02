<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
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
        $users = User::with('level', 'country', 'albums', 'liked_images', 'saved_images')->get();
        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::with('level', 'country', 'albums', 'liked_images', 'saved_images')->post();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $users = User::with('level', 'country', 'albums', 'liked_images', 'saved_images')->findOrFail($id);
        return new UserResource($users);
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
