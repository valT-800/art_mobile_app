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
            'username' => $this->user->username,
            'user_id' => $this->user->id,
            'images' => $this->images->map(function ($item) {
                return [
                    'id' => $item->id,
                    'url' => $item->url,
                ];
            }),
            $this->merge(['language' => $this->language])
        ];
    }
}
