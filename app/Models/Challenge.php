<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'challenges';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'description', 'start_time', 'end_time'];

    public function images()
    {
        return $this->belongsToMany(Challenge::class, 'challenges_images', 'challenge_id', 'image_id');
    }
}
