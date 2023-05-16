<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Album;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

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
            'name' => 'required',
            'username' => 'required',
            'email' => 'required',
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

        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['username'] =  $user->username;
        $success['name'] =  $user->name;


        return $this->sendResponse($success, 'User register successfully.');
    }

    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            //$user = User::findById(Auth::user());
            $user = $request->user();
            $success['token'] = $user->createToken('MyApp')->plainTextToken;
            $success['username'] =  $user->username;
            $success['name'] =  $user->name;

            return $this->sendResponse($success, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
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
