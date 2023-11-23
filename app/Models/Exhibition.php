<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exhibition extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'exhibitions';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'description', 'public', 'start_time', 'end_time'];

    public function gallery()
    {
        return $this->belongsTo(User::class)->withDefault();
    }
    public function posts()
    {
        return $this->belongsToMany(User::class, 'exhibitions_posts', 'exhibition_id', 'post_id');
    }
}
