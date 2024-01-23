<?php

namespace App\Http\Controllers\API\user;

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
    
    public function acceptInvitation(string $id, string $post_id)
    {
        $notification = Notification::where('title','Accepted invitation')->first();
        $exhibition=Exhibition::findOrFail($id);
        if($exhibition->end_time < date("Y-m-d H:i:s"))
        {
            return response()->json(['isSuccess' => false, 'message' => 'Exhibition already ended!']);
        }
        $gallery=User::findOrFail($exhibition->user->id);
        $gallery_notification=UserNotification::create(['related_id'=>$post_id,'related2_id'=>$id]);
        $gallery->notifications()->save($gallery_notification);
        $notification->users_notifications()->save($gallery_notification);

        $post=Post::findOrFail($post_id);
        $exhibition->posts()->attach($post,['created_at' => now(), 'updated_at' => now()]);
        
        $notification2 = Notification::where('title','Invitation to exhibition')->first();
        $user=User::findOrFail($post->user->id);
        UserNotification::where('user_id',$user->id)->where('notification_id',$notification2->id)->where('related_id',$id)->delete();
        
        return response()->json(['isSuccess' => true, 'message' => 'Invitation is accepted!']);
    }
    public function declineInvitation(string $id, string $post_id)
    {
        $notification = Notification::where('title','Declined invitation')->first();
        $exhibition=Exhibition::findOrFail($id);
        if($exhibition->end_time < date("Y-m-d H:i:s"))
        {
            return response()->json(['isSuccess' => false, 'message' => 'Exhibition already ended!']);
        }
        $gallery=User::findOrFail($exhibition->user->id);
        $gallery_notification=UserNotification::create(['related_id'=>$post_id,'related2_id'=>$id]);
        $gallery->notifications()->save($gallery_notification);
        $notification->users_notifications()->save($gallery_notification);

        $post=Post::findOrFail($post_id);
        $notification = Notification::where('title','Invitation to exhibition')->first();
        $user=User::findOrFail($post->user->id);
        UserNotification::where('user_id',$user->id)->where('notification_id',$notification->id)->where('related_id',$id)->delete();
        
        return response()->json(['isSuccess' => true, 'message' => 'Invitation is declined!']);

    }
    
}
