<?php

namespace App\Http\Controllers\API\user;

use App\Http\Controllers\API\CompetitionsController as APICompetitionsController;
use App\Http\Controllers\API\gallery\CompetitionsController as GalleryCompetitionsController;
use App\Http\Controllers\Controller;
use App\Http\Resources\CompetitionCollectionResource;
use App\Http\Resources\CompetitionResource;
use App\Models\Competition;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class CompetitionsController extends Controller
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
        $competitions = Competition::orderBy('created_at','desc')->paginate(10);
        return new CompetitionCollectionResource($competitions);
    }
    public function vote(string $competition_id, string $id)
    {
        $post = Post::findOrFail($id);
        $post->users_voted()->attach(Auth::id(),['created_at' => now(), 'updated_at' => now(),'competition_id' => $competition_id]);
        return response()->json(['voted'=>true]);
    }
    public function checkIfVoted(Request $request, string $id)
    {
        $competition = Competition::findOrFail($id);
        if($competition->public==0 || $competition->user->id==Auth::id() || $competition->winners->count()>0 || $competition->winners->count()>0 || $competition->start_time>date("Y-m-d H:i:s")|| $competition->end_time<date("Y-m-d H:i:s")){return response()->json(['voted'=>true]);}
        else{
            $user = $competition->users_voted()->where('user_id',Auth::id())->where('post_id',$request->post_id)->get();
            if($user->count() > 0)
            {return response()->json(['voted'=>true]);}
            else{ return response()->json(['voted'=>false]);}
        }
    }
    public function checkIfParticipated(string $id)
    {
        $competition = Competition::findOrFail($id);
        if($competition->public==0 || $competition->user->id==Auth::id() || $competition->winners->count()>0 || $competition->start_time>date("Y-m-d H:i:s")|| $competition->end_time<date("Y-m-d H:i:s")){return response()->json(['participated'=>true]);}
        else{
            $posts = $competition->posts()->where('user_id',Auth::id())->get();
            if($posts->count()!=0)
            {return response()->json(['participated'=>true]);}
            else{ return response()->json(['participated'=>false]);}

        }
        
    }
}
