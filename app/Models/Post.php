<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'posts';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['description', 'url'];

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'posts_tags', 'post_id', 'tag_id');
    }
    public function competitions()
    {
        return $this->belongsToMany(Competition::class, 'competitions_posts', 'post_id', 'competition_id');
    }
    public function users_liked()
    {
        return $this->belongsToMany(User::class, 'posts_likes', 'post_id', 'user_id');
    }
    public function users_saved()
    {
        return $this->belongsToMany(User::class, 'posts_saved', 'post_id', 'user_id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function album()
    {
        return $this->belongsTo(Album::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function users_voted($id)
    {
        return $this->belongsToMany(User::class, 'posts_votes', 'post_id', 'user_id')->where('competition_id',$id);
    }
    public function winnings()
    {
        return $this->belongsToMany(Competition::class,'winnings', 'post_id', 'competition_id');
    }
}
