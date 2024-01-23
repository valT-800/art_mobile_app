<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlbumResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'user' => [
                'id' => $this->user->id,
                'username' => $this->user->username,
                'profile_photo_url' => $this->user->profile_photo_url,
            ],
            'posts' => $this->posts->count(),
            'post' => new PostResource($this->posts->first()),
            $this->merge(['language' => $this->language])
        ];
    }
}
