<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;
    use HasRoles;
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'username',
        'points'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($user) {
            // Delete likes associated with the user
            DB::table('posts')->where('user_id', $user->id)->delete();
            DB::table('albums')->where('user_id', $user->id)->delete();
            DB::table('comments')->where('user_id', $user->id)->delete();
            DB::table('comments_likes')->where('user_id', $user->id)->delete();
            DB::table('posts_likes')->where('user_id', $user->id)->delete();
            DB::table('posts_saved')->where('user_id', $user->id)->delete();
            DB::table('posts_votes')->where('user_id', $user->id)->delete();
            DB::table('exhibitions')->where('user_id', $user->id)->delete();
            DB::table('competitions')->where('user_id', $user->id)->delete();
            DB::table('followers')->where('user_id', $user->id)->delete();
            DB::table('followers')->where('following_id', $user->id)->delete();
            DB::table('users_notifications')->where('user_id', $user->id)->delete();
        });
    }
    public function liked_comments()
    {
        return $this->belongsToMany(Comment::class, 'comments_likes', 'user_id', 'comment_id');
    }

    public function liked_posts()
    {
        return $this->belongsToMany(Post::class, 'posts_likes', 'user_id', 'post_id');
    }
    public function saved_posts()
    {
        return $this->belongsToMany(Post::class, 'posts_saved', 'user_id', 'post_id');
    }
    public function level()
    {
        return $this->belongsTo(Level::class);
    }
    public function country()
    {
        return $this->belongsTo(Country::class);
    }
    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'following_id', 'user_id');
    }
    public function following()
    {
        return $this->belongsToMany(User::class, 'followers', 'user_id', 'following_id');
    }
    public function albums()
    {
        return $this->hasMany(Album::class);
    }
    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function competitions()
    {
        return $this->hasMany(Competition::class);
    }
    public function unpublished_competitions()
    {
        return $this->hasMany(Competition::class)->where('public',0);
    } 
    public function planned_competitions()
    {
        return $this->hasMany(Competition::class)->where('public',1)->where('start_time','>',date("Y-m-d H:i:s"));
    }
    public function published_competitions()
    {
        return $this->hasMany(Competition::class)->where('public',1)->where('end_time','>',date("Y-m-d H:i:s"))->where('start_time','<',date("Y-m-d H:i:s"));
    }
    public function published_expired_competitions()
    {
        return $this->hasMany(Competition::class)->where('public',1)->where('end_time','<',date("Y-m-d H:i:s"));
    }
    public function exhibitions()
    {
        return $this->hasMany(Exhibition::class);
    }
    public function unpublished_exhibitions()
    {
        return $this->hasMany(Exhibition::class)->where('public',0);
    }
    public function planned_exhibitions()
    {
        return $this->hasMany(Exhibition::class)->where('public',1)->where('start_time','>',date("Y-m-d H:i:s"));
    }

    public function published_exhibitions()
    {
        return $this->hasMany(Exhibition::class)->where('public',1)->where('end_time','>',date("Y-m-d H:i:s"))->where('start_time','<',date("Y-m-d H:i:s"));
    }
    public function published_expired_exhibitions()
    {
        return $this->hasMany(Exhibition::class)->where('public',1)->where('end_time','<',date("Y-m-d H:i:s"));
    }
    
    public function notifications()
    {
        return $this->hasMany(UserNotification::class);
    }
    
}
