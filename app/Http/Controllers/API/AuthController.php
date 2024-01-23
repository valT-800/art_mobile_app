<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Http\Resources\UserResource;
use App\Models\Level;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Jetstream\Rules\Role;

class AuthController extends BaseController
{


    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:191'],
            'username' => ['required', 'string', 'max:191', Rule::unique('users', 'username')],
            'email' => ['required', 'string', 'email', 'max:191', 'unique:users'],
            'password' => 'required',
            'confirmation_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            //'api_token' => Str::random(60),
        ]);
        $level = Level::findOrFail(1);
        $user->level()->associate($level)->save();
        if($request->isGallerySelected)
        {
            $user->assignRole('gallery');
        }else
        {   
            $user->assignRole('user');
        }
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['username'] =  $user->username;
        $success['name'] =  $user->name;
        $success['id'] =  $user->id;
        $success['roles'] = $user->roles->map(function ($item) {
            return ['name' => $item->name];
        });
        return $this->sendResponse($success, 'User register successfully.');

    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {

        if (Auth::attempt(['email' => $request->email_or_username, 'password' => $request->password]) || Auth::attempt(['username' => $request->email_or_username, 'password' => $request->password])) {
            $user = $request->user();
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['username'] =  $user->username;
            $success['name'] =  $user->name;
            $success['id'] =  $user->id;
            $success['roles'] = $user->roles->map(function ($item) {
                return ['name' => $item->name];
            });
            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised', 'wrong credentials');
        }
    
    }

    public function update(Request $request)
    {

        $user = User::findOrFail(Auth::id());

        if ($request->edited) {
            $validator = Validator::make($request->all(), [
                'name' => ['required', 'string', 'max:191'],
                'username' => ['required', 'string', 'max:191', Rule::unique('users', 'username')->ignore($user->id)],
                'email' => ['required', 'email', 'max:191', Rule::unique('users', 'email')->ignore($user->id)],
                //'profile_photo_url' => ['nullable', 'mimes:jpg,jpeg,png', 'max:1024'],
            ]);
            if ($validator->fails()) {
                return $this->sendError('Validation Error', $validator->errors());
            }

            if ($request->email != $user->email && $user instanceof MustVerifyEmail) 
            {
                $this->updateVerifiedUser($request);
            } else {
                $user->forceFill([
                    'name' => $request->name,
                    'username' => $request->username,
                    'email' => $request->email,
                ])->update();
            }
        }
        if (isset($request->photo)) {
            $user->updateProfilePhoto($request->photo);
        }

        if ($request->follow) {
            $user_followed = User::find($request->following_id);
            $user_followed->followers()->sync($user->id);
        } else if ($request->unfollow) {
            $user_followed = User::find($request->following_id);
            $user_followed->followers()->detach($user->id);
        }
        $user->update();

        $success['token'] = $user->createToken('MyApp')->plainTextToken;
        $success['username'] =  $user->username;
        $success['name'] =  $user->name;
        $success['id'] =  $user->id;
        $success['roles'] = $user->roles->map(function ($item) {
            return ['name' => $item->name];
        });
        return $this->sendResponse($success, 'User info updated successfully.');
    }

    protected function updateVerifiedUser(Request $request): void
    {
        $user = User::findOrFail(Auth::id());
        $user->forceFill([
            'name' => $request->name,
            'username' => $request->username,
            'email' => $request->email,
            'email_verified_at' => null,
        ])->update();

        $user->sendEmailVerificationNotification();
    }
    public function logout(Request $request)
    {

        $user = $request->user();

        if ($user) {
            $user->tokens()->delete();
            return $this->sendResponse('Logged out', ['message' => 'Successfully logged out']);
        } else {
            return $this->sendError('Error', ['error' => 'Error']);
        }
    }
}
