<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostCollectionResource;
use App\Http\Resources\UserCollectionResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

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
        $users = User::all();

        return new UserCollectionResource($users);
    }
    public function getFollowingUsers()
    {
        $user = User::findOrFail(Auth::id());
        $followingUsers = $user->following()->orderBy('created_at', 'desc')->paginate(20);

        return new UserCollectionResource($followingUsers);
    }
    public function getFollowers()
    {
        $user = User::findOrFail(Auth::id());
        $followers = $user->followers()->orderBy('created_at', 'desc')->paginate(20);

        return new UserCollectionResource($followers);
    }

    public function update(Request $request, string $id)
    {
        $user = User::findOrFail(Auth::id());
        if ($request->edited) {
            Validator::make($request->all(), [
                'name' => ['required', 'string', 'max:255'],
                'username' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user->id)],
                'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
                //'profile_photo_url' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1024'],
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
        }
        if ($request->follow) {
            $user_followed = User::find($request->following_id);
            $user_followed->followers()->attach($user->id,['created_at' => now(), 'updated_at' => now()]);
        } else if ($request->unfollow) {
            $user_followed = User::find($request->following_id);
            $user_followed->followers()->detach($user->id);
        }
        
    }
    public function checkIfFollowing(string $id)
    {
        $user = User::findOrFail(Auth::id());
        $following =$user->following()->where('following_id',$id)->get();
        if ($following->count() > 0)
        {return response()->json(['isFollowing'=>true]);}
        else{ return response()->json(['isFollowing'=>false]);}
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
        $user = User::findOrFail($id);
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
