<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollectionResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

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
        $users = User::orderBy('created_at','desc')->paginate(20);
        return new UserCollectionResource($users);
    }
    
    public function getUsersVoted(string $competition_id,string $id)
    {
        $post = Post::findOrFail($id);
        $users_voted = $post->users_voted()->where('competition_id',$competition_id)->get();
        return response()->json(['users_voted' => $users_voted->count()]);
    }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }
}
