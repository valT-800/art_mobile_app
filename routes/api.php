<?php

use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::apiResource('albums', App\Http\Controllers\Api\AlbumsController::class)->only(['index', 'show']);
Route::get('albums/user/{id}', 'App\Http\Controllers\Api\AlbumsController@getUserAlbums');
Route::get('albums-short/user/{id}', 'App\Http\Controllers\Api\AlbumsController@getUserAlbumsShort');
Route::apiResource('competitions', App\Http\Controllers\Api\CompetitionsController::class)->only(['index', 'show']);
Route::apiResource('exhibitions', App\Http\Controllers\Api\ExhibitionsController::class)->only(['index', 'show']);
Route::apiResource('comments', App\Http\Controllers\Api\CommentsController::class)->only(['index', 'show']);
Route::get('comments/post/{id}', 'App\Http\Controllers\Api\CommentsController@getPostComments');
Route::apiResource('countries', App\Http\Controllers\Api\CountriesController::class)->only(['index', 'show']);
Route::apiResource('posts', App\Http\Controllers\Api\PostsController::class)->only(['index', 'show']);
Route::apiResource('users', App\Http\Controllers\Api\UsersController::class)->only(['index', 'show']);
Route::get('posts/noalbum/user/{id}', 'App\Http\Controllers\Api\PostsController@getPostsWithoutAlbum');
Route::get('posts/user/{id}', 'App\Http\Controllers\Api\PostsController@getUserPosts');
Route::get('competition-posts/{id}', 'App\Http\Controllers\Api\PostsController@getCompetitionPosts');
Route::get('exhibition-posts/{id}', 'App\Http\Controllers\Api\PostsController@getExhibitionPosts');
Route::get('posts/album/{id}', 'App\Http\Controllers\Api\PostsController@getAlbumPosts');
Route::apiResource('tags', App\Http\Controllers\Api\TagsController::class)->only(['index', 'show']);
Route::apiResource('users', App\Http\Controllers\Api\UsersController::class)->only(['index', 'show']);
Route::get('planned-competitions','App\Http\Controllers\Api\CompetitionsController@getPlannedCompetitions');
Route::get('published-competitions/user/{id}','App\Http\Controllers\Api\CompetitionsController@getUserPublishedCompetitions');
Route::get('published-competitions-archive/user/{id}','App\Http\Controllers\Api\CompetitionsController@getUserPublishedExpiredCompetitions');
Route::get('planned-competitions/user/{id}','App\Http\Controllers\Api\CompetitionsController@getUserPlannedCompetitions');
Route::get('planned-exhibitions/user/{id}','App\Http\Controllers\Api\ExhibitionsController@getPlannedExhibitions');
Route::get('published-exhibitions/user/{id}','App\Http\Controllers\Api\ExhibitionsController@getPublishedExhibitions');
Route::get('published-exhibitions-archive/user/{id}','App\Http\Controllers\Api\ExhibitionsController@getPublishedExpiredExhibitions');
Route::get('post-competitions/{id}','App\Http\Controllers\Api\CompetitionsController@getPostCompetitions');
Route::get('post-winnings/{id}','App\Http\Controllers\Api\CompetitionsController@getPostWinnings');
Route::get('post-exhibitions/{id}','App\Http\Controllers\Api\CompetitionsController@getPostExhibitions');
Route::get('users-voted/competition/{competition_id}/post/{id}','App\Http\Controllers\Api\UsersController@getUsersVoted');

Route::controller(App\Http\Controllers\Api\AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return new UserResource($request->user());
});
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('user/albums', App\Http\Controllers\Api\user\AlbumsController::class);
    Route::apiResource('user/comments', App\Http\Controllers\Api\user\CommentsController::class);
    Route::apiResource('user/posts', App\Http\Controllers\Api\user\PostsController::class);
    Route::apiResource('user/notifications', App\Http\Controllers\Api\user\NotificationsController::class);
    Route::get('user/liked-posts', 'App\Http\Controllers\Api\user\PostsController@getLikedPosts');
    Route::get('user/saved-posts', 'App\Http\Controllers\Api\user\PostsController@getSavedPosts');
    Route::get('user/following-posts', 'App\Http\Controllers\Api\user\PostsController@getFollowingUsersPosts');
    Route::get('user/users/following', 'App\Http\Controllers\Api\user\UsersController@getFollowingUsers');
    Route::get('user/followers', 'App\Http\Controllers\Api\user\UsersController@getFollowers');
    Route::get('user/is-following/user/{id}', 'App\Http\Controllers\Api\user\UsersController@checkIfFollowing');
    Route::put('user/voted/competition/{id}', 'App\Http\Controllers\Api\user\CompetitionsController@checkIfVoted');
    Route::get('user/liked/post/{id}', 'App\Http\Controllers\Api\user\PostsController@checkIfLiked');
    Route::get('user/saved/post/{id}', 'App\Http\Controllers\Api\user\PostsController@checkIfSaved');
    Route::get('user/participated/competition/{id}', 'App\Http\Controllers\Api\user\CompetitionsController@checkIfParticipated');
    Route::post('user/vote/competition/{competition_id}/post/{id}', 'App\Http\Controllers\Api\user\CompetitionsController@vote');
    Route::post('user/accept-invitation/exhibition/{id}/post/{post_id}', 'App\Http\Controllers\Api\user\ExhibitionsController@acceptInvitation');
    Route::post('user/decline-invitation/exhibition/{id}/post/{post_id}', 'App\Http\Controllers\Api\user\ExhibitionsController@declineInvitation');
    Route::apiResource('user/tags', App\Http\Controllers\Api\user\TagsController::class);
    Route::apiResource('user/users', App\Http\Controllers\Api\user\UsersController::class);
    Route::put('user/update', 'App\Http\Controllers\Api\AuthController@update');
    Route::post('logout', 'App\Http\Controllers\Api\AuthController@logout');
    Route::apiResource('gallery/exhibitions', App\Http\Controllers\Api\gallery\ExhibitionsController::class);
    Route::apiResource('gallery/competitions', App\Http\Controllers\Api\gallery\CompetitionsController::class);
    Route::get('gallery/unpublished-competitions','App\Http\Controllers\Api\gallery\CompetitionsController@getUnpublishedCompetitions');
    Route::get('gallery/unpublished-exhibitions','App\Http\Controllers\Api\gallery\ExhibitionsController@getUnpublishedExhibitions');
    Route::post('gallery/invite/exhibition/{exhibition_id}/post/{id}','App\Http\Controllers\Api\gallery\ExhibitionsController@invite');
});
/*Route::group(['middleware' => ['auth:api', 'role:gallery']], function () {
    Route::apiResource('gallery/exhibitions', App\Http\Controllers\Api\gallery\ExhibitionsController::class);
    Route::apiResource('gallery/competitions', App\Http\Controllers\Api\gallery\CompetitionsController::class);
    Route::get('gallery/unpublished-competitions','App\Http\Controllers\Api\gallery\CompetitionsController@getUnpublishedCompetitions');
    Route::get('gallery/unpublished-exhibitions','App\Http\Controllers\Api\gallery\ExhibitionsController@getUnpublishedExhibitions');
    Route::post('gallery/invite/post/{id}','App\Http\Controllers\Api\gallery\ExhibitionsController@invite');
});*/