<?php

namespace App\Http\Controllers\API\gallery;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExhibitionCollectionResource;
use App\Http\Resources\ExhibitionResource;
use App\Models\Exhibition;
use App\Models\Notification;
use App\Models\UserNotification;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ExhibitionsController extends Controller
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
        $exhibitions = Exhibition::orderBy('created_at','desc')->paginate(10);
        return new ExhibitionCollectionResource($exhibitions);
    }
    public function getUnpublishedExhibitions()
    {
        $gallery = User::findOrFail(Auth::id());
        $exhibitions = $gallery->unpublished_exhibitions()->orderBy('created_at','desc')->paginate(10);
        return new ExhibitionCollectionResource($exhibitions);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::find(Auth::id());
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'start_time' => 'required|date_format:Y-m-d H:i:s|after:now',
            'end_time' => 'required|date_format:Y-m-d H:i:s|after:start_time'
        ]);
        if ($validator->fails()) {
            return response()->json(['isSuccess' => false, 'message' => $validator->messages()],404);
        }

        $user->exhibitions()->create($request->all());

        return response()->json(['isSuccess' => true, 'message' => 'Succesfully posted']);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $exhibition = Exhibition::findOrFail($id);
        return new ExhibitionResource($exhibition);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $exhibition=Exhibition::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'start_time' => 'required|date_format:Y-m-d H:i:s|after:now',
            'end_time' => 'required|date_format:Y-m-d H:i:s|after:start_time'
        ]);
        if ($validator->fails()) {
            return response()->json(['isSuccess' => false, 'message' => $validator->messages()],404);
        }
        $exhibition->update([
            'title' => $request->title,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time
        ]);
        if($request->publish){ $exhibition->update(['public'=>1]);};
        return new ExhibitionResource($exhibition);
    }
    
    public function invite(string $exhibition_id,string $id)
    {
        $notification=Notification::where('title','Invitation to exhibition')->first();
        $post=Post::findOrFail($id);
        $user=User::findOrFail($post->user->id);
        $user_notifications = UserNotification::where('user_id',$user->id)->where('notification_id',$notification->id)->where('related_id',$exhibition_id)->first();
        if($user_notifications)
        {        
            return response()->json(['isSuccess' => false, 'message' => 'User is already invited!']);
        }
        $user_notification=UserNotification::create(['related_id'=>$exhibition_id,'related2_id'=>$id]);
        $user->notifications()->save($user_notification);
        $notification->users_notifications()->save($user_notification);
        return response()->json(['isSuccess' => true, 'message' => 'User is invited!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $exhibition = Exhibition::findOrFail($id);
        $exhibition->delete();
    }
}
