<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
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
            'related_id' => $this->related_id,
            'related2_id' => $this->related2_id,
            'is_read' => $this->is_read,
            'notification' => $this->notification,
            /*'exhibition' => $this->exhibition ? [
                'id' => $this->exhibition->id,
                'title' => $this->exhibition->title,
                'user' => [
                    'id' => $this->exhibition->user->id,
                    'username' => $this->exhibition->user->username,
                ],
            ] : null,
            'competition' => $this->competition ? [
                'id' => $this->competition->id,
                'title' => $this->competition->title,
                'user' => [
                    'id' => $this->competition->user->id,
                    'username' => $this->competition->user->username,
                ],
            ] : null,
            'post' => $this->post ? [
                'id' => $this->post->id,
                'url' => $this->post->url,
                'user' => [
                    'id' => $this->post->user->id,
                    'username' => $this->post->user->username,
                ],
            ] : null,*/
            'user' => [
                'id' => $this->user->id,
                'username' => $this->user->username,
                'profile_photo_url' => $this->user->profile_photo_url,
            ],
            'created_at' => CommentResource::getTimeDifference($this->created_at->timestamp),
            $this->merge(['language' => $this->language])
        ];
    }
}
