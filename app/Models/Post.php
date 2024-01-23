<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($post) {
            // Delete likes associated with the post
            DB::table('posts_likes')->where('post_id', $post->id)->delete();
            DB::table('posts_saved')->where('post_id', $post->id)->delete();
            DB::table('posts_votes')->where('post_id', $post->id)->delete();
            DB::table('exhibitions_posts')->where('post_id', $post->id)->delete();
            DB::table('competitions_posts')->where('post_id', $post->id)->delete();
            $post->comments->map(function ($item){
                $item->delete();
            });
        });
    }
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'posts_tags', 'post_id', 'tag_id');
    }
    public function competitions()
    {
        return $this->belongsToMany(Competition::class, 'competitions_posts', 'post_id', 'competition_id')->where('end_time','>',date("Y-m-d H:i:s"));
    }
    public function exhibitions()
    {
        return $this->belongsToMany(Competition::class, 'exhibitions_posts', 'post_id', 'exhibition_id');
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
    public function users_voted()
    {
        return $this->belongsToMany(User::class, 'posts_votes', 'post_id', 'user_id');
    }
    public function winnings()
    {
        return $this->belongsToMany(Competition::class,'winnings', 'post_id', 'competition_id');
    }
}
