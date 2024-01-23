<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use League\CommonMark\Extension\CommonMark\Node\Inline\Code;

class Comment extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'comments';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['content'];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($comment) {
            // Delete likes associated with the comment
            DB::table('comments_likes')->where('comment_id', $comment->id)->delete();
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    public function parent()
    {
        return $this->belongsTo($this::class, 'parent_id');
    }
    public function comments()
    {
        return $this->hasMany($this::class, 'parent_id');
    }
    public function users_liked()
    {
        return $this->belongsToMany(User::class, 'comments_likes', 'comment_id', 'user_id');
    }
}