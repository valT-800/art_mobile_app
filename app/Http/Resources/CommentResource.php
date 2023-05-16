<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            'views' => $this->views,
            'image_id' => $this->image_id,
            'user' => [
                'username' => $this->user->username,
                'profile_photo' => $this->user->profile_photo_url,
                'id' => $this->user->id
            ],
            'users_liked' => $this->users_liked->map(function ($item) {
                return ['id' => $item->id, 'username' => $item->username];
            }),
            'content' => $this->content,
            'parent' => $this->parent,
            'created_at' => $this->created_at,
            'comments' => $this->comments,
            $this->merge(['language' => $this->language])
        ];
    }
}
