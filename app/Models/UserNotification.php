<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserNotification extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users_notifications';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['is_read', 'related_id','related2_id'];
    public function notification()
    {
        return $this->belongsTo(Notification::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    /*public function exhibition()
    {
            return $this->hasOne(Exhibition::class,'related_id');
    }
    public function competition()
    {
            return $this->hasOne(Competition::class,'related_id');
    }
    public function post()
    {
            return $this->hasOne(Post::class,'related_id');
    }*/
}
