<?php

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

Route::apiResource('albums', App\Http\Controllers\Api\AlbumsController::class);
Route::apiResource('challenges', App\Http\Controllers\Api\ChallengesController::class)->only(['index', 'show']);
Route::apiResource('comments', App\Http\Controllers\Api\CommentsController::class)->only(['index', 'show']);
Route::apiResource('countries', App\Http\Controllers\Api\CountriesController::class)->only(['index', 'show']);
Route::apiResource('images', App\Http\Controllers\Api\ImagesController::class)->only(['index', 'show']);
Route::apiResource('tags', App\Http\Controllers\Api\TagsController::class)->only(['index', 'show']);
Route::apiResource('users', App\Http\Controllers\Api\UsersController::class)->only(['index', 'show']);


Route::controller(App\Http\Controllers\Api\RegisterController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*Route::middleware('auth:sanctum')->group(function () {
    Route::resource('albums', App\Http\Controllers\Api\AlbumsController::class);
});

Route::post('auth/login', 'App\Http\Controllers\Api\AuthController@login');

Route::group(['middleware' => 'api'], function () {
    Route::post('auth/logout', 'App\Http\Controllers\Api\AuthController@logout');
    Route::get('users', 'App\Http\Controllers\Api\UsersController@index');
});*/
