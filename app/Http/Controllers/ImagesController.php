<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImagesController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $images = Image::all()->sortBy("create_at");
        return view('user.images.index', compact('images'));
    }
}
