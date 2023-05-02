<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
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

    public function liked_comments()
    {
        return $this->belongsToMany(Comment::class, 'comments_likes', 'user_id', 'comment_id');
    }

    public function liked_images()
    {
        return $this->belongsToMany(Image::class, 'images_likes', 'user_id', 'image_id');
    }
    public function saved_images()
    {
        return $this->belongsToMany(Image::class, 'images_saved', 'user_id', 'image_id');
    }
    public function level()
    {
        return $this->belongsTo(Level::class);
    }
    public function country()
    {
        return $this->belongsTo(Country::class);
    }
    /*public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'user_id', 'follower_id');
    }
    
    public function following_users()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'user_id');
    }*/
    public function albums()
    {
        return $this->hasMany(Album::class);
    }
}
