<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

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
            'followers' => $this->followers->map(function ($item) {
                return ['id' => $item->id, 'username' => $item->username];
            }),
            'following' => $this->following->map(function ($item) {
                return ['id' => $item->id, 'username' => $item->username];
            }),
            'albums' => $this->albums->map(function ($item) {
                return ['id' => $item->id, 'title' => $item->title];
            }),
            'images' => $this->albums->map(function ($item) {
                return ['id' => $item->id, 'url' => $item->url];
            }),
            'liked_images' => $this->liked_images->map(function ($item) {
                return ['id' => $item->id, 'url' => $item->url];
            }),
            //'liked_comments' => $this->liked_comments,
            'saved_images' => $this->saved_images->map(function ($item) {
                return ['id' => $item->id, 'url' => $item->url];
            }),
            $this->merge(['language' => $this->language])
        ];
    }
}