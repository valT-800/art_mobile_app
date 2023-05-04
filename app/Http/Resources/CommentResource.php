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
            'likes' => $this->users_liked->count(),
            'views' => $this->views,
            'user' => $this->user->name,
            'content' => $this->content,
            'parent' => $this->parent,
            'created_at' => $this->created_at,
            'comments' => $this->comments,
            $this->merge(['language' => $this->language])
        ];
    }
}
