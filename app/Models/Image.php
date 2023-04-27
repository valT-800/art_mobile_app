<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'images';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['description', 'views'];

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'images_tags', 'image_id', 'tag_id');
    }
    public function challenges()
    {
        return $this->belongsToMany(Challenge::class, 'challenges_images', 'image_id', 'challenge_id');
    }
    public function users_liked()
    {
        return $this->belongsToMany(User::class, 'images_likes', 'image_id', 'user_id');
    }
    public function users_saved()
    {
        return $this->belongsToMany(User::class, 'images_saved', 'image_id', 'user_id');
    }
}
