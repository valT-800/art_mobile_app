<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    public function image()
    {
        return $this->hasOne(Image::class);
    }
    public function parent()
    {
        return $this->hasOne($this::class);
    }

    public function users_liked()
    {
        return $this->belongsToMany(User::class, 'comments_likes', 'comment_id', 'user_id');
    }
}
