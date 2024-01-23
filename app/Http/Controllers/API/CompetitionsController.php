<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompetitionCollectionResource;
use App\Http\Resources\CompetitionResource;
use App\Http\Resources\ExhibitionCollectionResource;
use App\Models\Competition;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

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
        $competitions = Competition::where('public',1)->where('start_time','<',date("Y-m-d H:i:s"))->where('end_time','>',date("Y-m-d H:i:s"))->orderBy('end_time')->paginate(10);
        return new CompetitionCollectionResource($competitions);
    }
    public function getPlannedCompetitions()
    {
        $competitions = Competition::where('public',1)->where('start_time','>',date("Y-m-d H:i:s"))->orderBy('start_time')->paginate(10);
        return new CompetitionCollectionResource($competitions);
    }
    public function getUserPlannedCompetitions(string $id)
    {
        $gallery = User::findOrFail($id);
        $competitions = $gallery->planned_competitions()->orderBy('start_time')->paginate(10);
        return new CompetitionCollectionResource($competitions);
    }
    public function getUserPublishedCompetitions(string $id)
    {
        $gallery = User::findOrFail($id);
        $competitions = $gallery->published_competitions()->orderBy('end_time')->paginate(10);
        return new CompetitionCollectionResource($competitions);
    }
    public function getUserPublishedExpiredCompetitions(string $id)
    {
        $gallery = User::findOrFail($id);
        $competitions = $gallery->published_expired_competitions()->orderBy('updated_at','desc')->paginate(10);
        return new CompetitionCollectionResource($competitions);
    }
    
    public function getPostCompetitions(string $id)
    {
        $post = Post::findOrFail($id);
        $competitions=$post->competitions()->orderBy('updated_at','desc')->paginate(10);
        return new CompetitionCollectionResource($competitions);
    }
    public function getPostWinnings(string $id)
    {
        $post = Post::findOrFail($id);
        $competitions=$post->winnings()->orderBy('updated_at','desc')->paginate(10);
        return new CompetitionCollectionResource($competitions);
    }
    
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $competitions = Competition::findOrFail($id);
        return new CompetitionResource($competitions);
    }
}
