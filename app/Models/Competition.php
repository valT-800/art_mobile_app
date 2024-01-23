<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Competition extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'competitions';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'description', 'public','start_time', 'end_time'];

    public function posts()
    {
        return $this->belongsToMany(Post::class, 'competitions_posts', 'competition_id', 'post_id');
    }
    public function user()
    {
        return $this->belongsTo(User::class)->withDefault();
    }
    public function winners()
    {
        return $this->belongsToMany(Post::class,'winnings','competition_id','post_id');
    }
    public function users_voted()
    {
        return $this->belongsToMany(User::class,'posts_votes','competition_id','user_id');
    }
}