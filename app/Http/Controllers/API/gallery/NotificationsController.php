<?php

namespace App\Http\Controllers\API\gallery;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationCollectionResource;
use App\Http\Resources\NotificationResource;
use App\Models\Exhibition;
use App\Models\UserNotification;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NotificationsController extends Controller
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
        $notifications = UserNotification::where('user_id',Auth::id())->orderBy('created_at', 'desc')->paginate(20);
        return new NotificationCollectionResource($notifications);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }
    public function inviteUserToExhibition(Request $request)
    {     
        $exhibition = Exhibition::find($request->exhibtion_id);
        $user = User::find($request->user_id);
        $notification = UserNotification::create();
        $user->notifications()->sync($notification);
        $notification->exhibition()->sync($exhibition); 
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $notification = UserNotification::findOrFail($id);
        return new NotificationResource($notification);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $notification = UserNotification::findOrFail($id);
        if ($request->is_read) {
            $notification->is_read=$request->is_read;
        }
        $notification->update();
        return new NotificationResource($notification);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $notification = UserNotification::findOrFail($id);
        $notification->delete();
    }
}
