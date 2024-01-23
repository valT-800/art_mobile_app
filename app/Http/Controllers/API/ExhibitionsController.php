<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ExhibitionCollectionResource;
use App\Http\Resources\ExhibitionResource;
use App\Models\Exhibition;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;

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
        $exhibitions = Exhibition::where('public',1)->where('start_time','<',date("Y-m-d H:i:s"))->where('end_time','>',date("Y-m-d H:i:s"))->orderBy('end_time')->paginate(10);
        return new ExhibitionCollectionResource($exhibitions);
    }
    public function getPlannedExhibitions(string $id)
    {
        $gallery = User::findOrFail($id);
        $exhibitions = $gallery->planned_exhibitions()->orderBy('start_time')->paginate(10);
        return new ExhibitionCollectionResource($exhibitions);
    }
    
    public function getPublishedExhibitions(string $id)
    {
        $gallery = User::findOrFail($id);
        $exhibitions = $gallery->published_exhibitions()->orderBy('end_time')->paginate(10);
        return new ExhibitionCollectionResource($exhibitions);
    }
    public function getPublishedExpiredExhibitions(string $id)
    {
        $gallery = User::findOrFail($id);
        $exhibitions = $gallery->published_expired_exhibitions()->orderBy('updated_at','desc')->paginate(10);
        return new ExhibitionCollectionResource($exhibitions);
    }
    
    public function getPostExhibitions(string $id)
    {
        $post = Post::find($id);
        $exhibitions=$post->exhibitions()->orderBy('updated_at','desc')->paginate(10);
        return new ExhibitionCollectionResource($exhibitions);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $exhibition = Exhibition::findOrFail($id);
        return new ExhibitionResource($exhibition);
    }
}
