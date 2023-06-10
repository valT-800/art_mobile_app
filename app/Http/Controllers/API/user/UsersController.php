<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\ImageCollectionResource;
use App\Http\Resources\UserResource;
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
        $users = User::with('albums', 'images', 'liked_images', 'saved_images', 'following', 'followers')->get();

        return UserResource::collection($users);
    }
    public function getFollowingUsersImages(Request $request)
    {
        $user = User::findOrFail(Auth::id());
        $followingUsers = $user->following()->with('albums', 'images', 'liked_images', 'saved_images', 'followers', 'following')->get();
        $followingUsers = $user->following()->with(['images.user', 'images.comments', 'images.users_liked', 'images.users_saved', 'images.tags', 'images.challenges'])->get();
        $images = $followingUsers->pluck('images')->flatten();

        $user = $images->pluck('user')->flatten();
        $comments = $images->pluck('comments')->flatten();
        $users_saved = $images->pluck('users_saved')->flatten();
        $users_liked = $images->pluck('users_liked')->flatten();
        $challenges = $images->pluck('challenges')->flatten();

        $tags = $images->pluck('tags')->flatten();
        $perPage = $request->input('per_page', 4); // Number of items per page, defaulting to 4
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $slicedImages = $images->slice(($currentPage - 1) * $perPage, $perPage);

        $paginatedImages = new LengthAwarePaginator(
            $slicedImages,
            $images->count(),
            $perPage,
            $currentPage
        );
        return new ImageCollectionResource($paginatedImages, $user, $users_liked, $users_saved, $comments, $tags, $challenges);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
            $user_followed->followers()->sync($user->id);
        } else if ($request->unfollow) {
            $user_followed = User::find($request->following_id);
            $user_followed->followers()->detach($user->id);
        }
        
    }
    protected function updateVerifiedUser(Request $request): void
    {
        $user = User::with('albums', 'images', 'liked_images', 'saved_images', 'following', 'followers')->findOrFail(Auth::id());
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
