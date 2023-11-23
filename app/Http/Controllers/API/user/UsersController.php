<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostCollectionResource;
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
        $users = User::with('albums', 'posts', 'liked_posts', 'saved_posts', 'following', 'followers')->get();

        return UserResource::collection($users);
    }
    public function getFollowingUsersPosts(Request $request)
    {
        $user = User::findOrFail(Auth::id());
        $followingUsers = $user->following()->with('albums', 'posts', 'liked_posts', 'saved_posts', 'followers', 'following')->get();
        $followingUsers = $user->following()->with(['posts.user', 'posts.comments', 'posts.users_liked', 'posts.users_saved', 'posts.tags', 'posts.competitions'])->get();
        $posts = $followingUsers->pluck('posts')->flatten();

        $user = $posts->pluck('user')->flatten();
        $comments = $posts->pluck('comments')->flatten();
        $users_saved = $posts->pluck('users_saved')->flatten();
        $users_liked = $posts->pluck('users_liked')->flatten();
        $competitions = $posts->pluck('competitions')->flatten();

        $tags = $posts->pluck('tags')->flatten();
        $perPage = $request->input('per_page', 4); // Number of items per page, defaulting to 4
        $currentPage = LengthAwarePaginator::resolveCurrentPage();
        $slicedPosts = $posts->slice(($currentPage - 1) * $perPage, $perPage);

        $paginatedPosts = new LengthAwarePaginator(
            $slicedPosts,
            $posts->count(),
            $perPage,
            $currentPage
        );
        //return new PostCollectionResource($paginatedPosts, $user, $users_liked, $users_saved, $comments, $tags, $competitions);
        return new PostCollectionResource($paginatedPosts);
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
        $user = User::with('albums', 'posts', 'liked_posts', 'saved_posts', 'following', 'followers')->findOrFail(Auth::id());
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
        $user = User::with('albums', 'posts', 'liked_posts', 'saved_posts', 'following', 'followers')->findOrFail($id);
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
