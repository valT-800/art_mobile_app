<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageResource;
use App\Http\Resources\UserResource;
use App\Models\Image;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class ImagesController extends Controller
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
        $users = User::with('albums', 'images', 'liked_images', 'saved_images', 'following', 'followers')->get();

        return UserResource::collection($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::findOrFail(Auth::id());
        Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user->id)],
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'profile_photo' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1024'],
        ])->validateWithBag('updateProfileInformation');

        if (isset($request->photo)) {
            $user->updateProfilePhoto($request->photo);
        }

        if (
            $request->email !== $user->email &&
            $user instanceof MustVerifyEmail
        ) {
            $this->updateVerifiedUser($request);
        } else {
            $user->forceFill([
                'name' => $request->name,
                'email' => $request->email,
            ])->save();
        }
        if ($request->user_followed_id) {
            $user_followed = User::find($request->user_followed_id);
            $user_followed->following()->save($user);
        }
        $this->show($user->id);
    }
    protected function updateVerifiedUser(Request $request): void
    {
        $user = User::findOrFail(Auth::id());
        $user->forceFill([
            'name' => $request->name,
            'email' => $request->email,
            'email_verified_at' => null,
        ])->save();

        $user->sendEmailVerificationNotification();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with('albums', 'images', 'liked_images', 'saved_images', 'following', 'followers')->findOrFail($id);
        return new UserResource($user);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        $user = User::findOrFail(Auth::id());
        $user->delete();
    }
}
