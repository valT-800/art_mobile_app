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
            'album' => $this->album->title,
            'likes' => $this->users_liked->count(),
            'saves' => $this->users_saved->count(),
            'views' => $this->views,
            'user' => $this->album->user->name,
            'comments' => $this->comments,
            'challenges' => $this->challenges->map(function ($item) {
                return $item['title'];
            }),
            'tags' => $this->tags->map(function ($item) {
                return $item['tag'];
            }),
            $this->merge(['language' => $this->language])
        ];
    }
}
