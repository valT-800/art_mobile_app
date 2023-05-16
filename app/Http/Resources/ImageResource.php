<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
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
            'description' => $this->description,
            'url' => $this->url,

            'album' => $this->album ? [
                'title' => $this->album->title,
                'id' => $this->album->id
            ] : null,
            'users_liked' => $this->users_liked->map(function ($item) {
                return ['id' => $item->id, 'username' => $item->username];
            }),
            'users_saved' => $this->users_saved->map(function ($item) {
                return ['id' => $item->id, 'username' => $item->username];
            }),
            'views' => $this->views,
            'user' => [
                'username' => $this->user->username,
                'profile_photo' => $this->user->profile_photo_url,
                'id' => $this->user->id
            ],
            'comments' => $this->comments,
            'challenges' => $this->challenges->map(function ($item) {

                return ['id' => $item->id, 'title' => $item->title];
            }),
            'tags' => $this->tags->map(function ($item) {
                return ['id' => $item->id, 'tag' => $item->tag];
            }),
            'created_at' => $this->created_at,
            $this->merge(['language' => $this->language])
        ];
    }
}
