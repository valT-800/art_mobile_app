<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::view('/', 'pages.home');           //naršyklės lange įvedus svetainės adresą bus matomas vaizdas home, esantis kataloge pages
Route::view('/home', 'pages.home');       //naršyklės lange įvedus svetainės adresą + '/home' (pvz., http://localhost:8000/home) bus matomas vaizdas home

Route::view('/admin', 'admin.dashboard'); //naršyklės lange įvedus svetainės adresą + '/admin' bus matomas vaizdas dashboard
Route::view('/user', 'user.dashboard');

Route::get('/admin/roles', [App\Http\Controllers\Admin\RolesController::class, 'index']);
Route::get('/admin/roles/create', [App\Http\Controllers\Admin\RolesController::class, 'create']);
Route::post('/admin/roles', [App\Http\Controllers\Admin\RolesController::class, 'store']);
Route::get('/admin/roles/{id}', [App\Http\Controllers\Admin\RolesController::class, 'show']);
Route::get('/admin/roles/{id}/edit', [App\Http\Controllers\Admin\RolesController::class, 'edit']);
Route::patch('/admin/roles/{id}', [App\Http\Controllers\Admin\RolesController::class, 'update']);
Route::delete('/admin/roles/{id}', [App\Http\Controllers\Admin\RolesController::class, 'destroy']);

Route::get('/admin/users', [App\Http\Controllers\Admin\UsersController::class, 'index']);
Route::get('/admin/users/create', [App\Http\Controllers\Admin\UsersController::class, 'create']);
Route::post('/admin/users', [App\Http\Controllers\Admin\UsersController::class, 'store']);
Route::get('/admin/users/{id}', [App\Http\Controllers\Admin\UsersController::class, 'show']);
Route::get('/admin/users/{id}/edit', [App\Http\Controllers\Admin\UsersController::class, 'edit']);
Route::patch('/admin/users/{id}', [App\Http\Controllers\Admin\UsersController::class, 'update']);
Route::delete('/admin/users/{id}', [App\Http\Controllers\Admin\UsersController::class, 'destroy']);

Route::get('/user/albums', [App\Http\Controllers\AlbumsController::class, 'index']);
Route::get('/user/albums/create', [App\Http\Controllers\AlbumsController::class, 'create']);
Route::post('/user/albums', [App\Http\Controllers\AlbumsController::class, 'store']);
Route::get('/user/albums/{id}', [App\Http\Controllers\AlbumsController::class, 'show']);
Route::get('/user/albums/{id}/edit', [App\Http\Controllers\AlbumsController::class, 'edit']);
Route::patch('/user/albums/{id}', [App\Http\Controllers\AlbumsController::class, 'update']);
Route::delete('/user/albums/{id}', [App\Http\Controllers\AlbumsController::class, 'destroy']);

Route::get('/user/images', [App\Http\Controllers\ImagesController::class, 'index']);
Route::get('/user/images/create', [App\Http\Controllers\ImagesController::class, 'create']);
Route::post('/user/images', [App\Http\Controllers\ImagesController::class, 'store']);
Route::get('/user/images/{id}', [App\Http\Controllers\ImagesController::class, 'show']);
Route::get('/user/images/{id}/edit', [App\Http\Controllers\ImagesController::class, 'edit']);
Route::patch('/user/images/{id}', [App\Http\Controllers\ImagesController::class, 'update']);
Route::delete('/user/images/{id}', [App\Http\Controllers\ImagesController::class, 'destroy']);

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified'
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});