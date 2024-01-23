<?php

namespace App\Http\Controllers\API\gallery;

use App\Http\Controllers\Controller;
use App\Http\Resources\CompetitionCollectionResource;
use App\Http\Resources\CompetitionResource;
use App\Models\Competition;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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
    public function getUnpublishedCompetitions()
    {
        $gallery = User::findOrFail(Auth::id());
        $competitions = $gallery->unpublished_competitions()->orderBy('created_at','desc')->paginate(10);
        return new CompetitionCollectionResource($competitions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = User::find(Auth::id());
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:191',
            'start_time' => 'required|date_format:Y-m-d H:i:s|after:now',
            'end_time' => 'required|date_format:Y-m-d H:i:s|after:start_time'
        ]);
        if ($validator->fails()) {
            return response()->json(['isSuccess' => false, 'message' => $validator->messages()],404);
        }
        
        $user->competitions()->create($request->all());

        return response()->json(['isSuccess' => true, 'message' => 'Succesfully posted']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $competitions = Competition::with('posts')->findOrFail($id);
        return new CompetitionResource($competitions);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $competition=Competition::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:191',
            'start_time' => 'required|date_format:Y-m-d H:i:s|after:now',
            'end_time' => 'required|date_format:Y-m-d H:i:s|after:start_time'
        ]);
        if ($validator->fails()) {
            return response()->json(['isSuccess' => false, 'message' => $validator->messages()],404);
        }
        $competition->update([
            'title' => $request->title,
            'description' => $request->description,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time
        ]);
        if($request->publish){ $competition->update(['public'=>1]);};
        return new CompetitionResource($competition);

    }
    
    public function attachPostToCompetition(Request $request, string $id)
    {
        $competition = Competition::findOrFail($id);
        $competition->posts()->sync($request->post_id);
        return response()->json(['isSuccess' => true, 'message' => 'Succesfully attached post to competition']);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $competition = Competition::findOrFail($id);
        $competition->delete();
        
        return response()->json(['isSuccess' => true, 'message' => 'Succesfully deleted']);
    }
}
