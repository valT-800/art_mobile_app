<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Album extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'albums';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['title', 'description'];

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault();
    }
    public function images()
    {
        return $this->hasMany(Image::class);
    }
}
