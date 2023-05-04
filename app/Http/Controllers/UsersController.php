<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsersController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function index(Request $request)
    {
        $users = User::all();
        return view('user.users.index', compact('users'));
    }
}
