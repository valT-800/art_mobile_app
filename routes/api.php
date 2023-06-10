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
Route::get('albums/user/{id}', 'App\Http\Controllers\Api\AlbumsController@getByUserId');
Route::apiResource('challenges', App\Http\Controllers\Api\ChallengesController::class)->only(['index', 'show']);
Route::apiResource('comments', App\Http\Controllers\Api\CommentsController::class)->only(['index', 'show']);
Route::get('comments/image/{id}', 'App\Http\Controllers\Api\CommentsController@getByImageId');
Route::apiResource('countries', App\Http\Controllers\Api\CountriesController::class)->only(['index', 'show']);
Route::apiResource('images', App\Http\Controllers\Api\ImagesController::class)->only(['index', 'show']);
Route::get('images/noalbum/user/{id}', 'App\Http\Controllers\Api\ImagesController@getImagesWithoutAlbum');
Route::get('users/following', 'App\Http\Controllers\Api\UsersController@getFollowingUsersImages');
Route::apiResource('tags', App\Http\Controllers\Api\TagsController::class)->only(['index', 'show']);
Route::apiResource('users', App\Http\Controllers\Api\UsersController::class)->only(['index', 'show']);


Route::controller(App\Http\Controllers\Api\AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return new UserResource($request->user());
});
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('user/albums', App\Http\Controllers\Api\user\AlbumsController::class);
    Route::apiResource('user/challenges', App\Http\Controllers\Api\user\ChallengesController::class);
    Route::apiResource('user/comments', App\Http\Controllers\Api\user\CommentsController::class);
    Route::apiResource('user/countries', App\Http\Controllers\Api\user\CountriesController::class);
    Route::apiResource('user/images', App\Http\Controllers\Api\user\ImagesController::class);
    Route::get('user/liked-images', 'App\Http\Controllers\Api\user\ImagesController@getLikedImages');
    Route::get('user/saved-images', 'App\Http\Controllers\Api\user\ImagesController@getSavedImages');
    Route::get('user/users/following/images', 'App\Http\Controllers\Api\user\UsersController@getFollowingUsersImages');
    Route::apiResource('user/tags', App\Http\Controllers\Api\user\TagsController::class);
    Route::apiResource('user/users', App\Http\Controllers\Api\user\UsersController::class);
    Route::put('user/update', 'App\Http\Controllers\Api\AuthController@update');
    Route::post('logout', 'App\Http\Controllers\Api\AuthController@logout');
});
