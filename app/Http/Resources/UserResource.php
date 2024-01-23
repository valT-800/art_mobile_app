<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Laravel\Jetstream\Rules\Role;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'username' => $this->username,
            'password' => $this->password,
            'level' => $this->level ? $this->level->title : null,
            'country' => $this->country ? $this->country->name : null,
            'city' => $this->city,
            'avatar' => $this->avatar,
            'cover' => $this->cover,
            'points' => $this->points,
            'roles' => $this->roles->map(function ($item) {
                return ['name' => $item->name];
            }),
            'profile_photo_url' => $this->profile_photo_url,
            'followers' => $this->followers->count(),
            'following' => $this->following->count(),
            'albums' => $this->albums->count(),
            'posts' => $this->posts->count(),
            'liked_posts' => $this->saved_posts->count(),
            'saved_posts' => $this->liked_posts->count(),
            'liked_comments' => $this->liked_comments->count(),
            'competitions' => $this->competitions->count(),
            'unpublished_competitions' => $this->unpublished_competitions->count(),
            'planned_competitions' => $this->planned_competitions->count(),
            'published_competitions' => $this->published_competitions->count(),
            'unpublished_exhibitions' => $this->unpublished_exhibitions->count(),
            'planned_exhibitions' => $this->planned_exhibitions->count(),
            'published_exhibitions' => $this->published_exhibitions->count(),
            $this->merge(['language' => $this->language])
        ];
    }
}
