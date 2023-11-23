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
            'post_id' => $this->post_id,
            'user' => [
                'username' => $this->user->username,
                'profile_photo_url' => $this->user->profile_photo_url,
                'id' => $this->user->id
            ],
            'users_liked' => $this->users_liked->map(function ($item) {
                return ['id' => $item->id, 'username' => $item->username];
            }),
            'content' => $this->content,
            'parent' => $this->parent,
            'created_at' => $this->getTimeDifference($this->created_at->timestamp),
            'comments' => $this->comments->map(function ($item) {
                return new self($item);
            }),
            $this->merge(['language' => $this->language])
        ];
    }
    private function getTimeDifference($timestamp)
    {

        $now = time();  // Current timestamp
        $difference = $now - $timestamp;  // Time difference in seconds

        if ($difference < 60) {
            // Less than a minute
            return $difference . " seconds";
        } elseif ($difference < 3600) {
            // Less than an hour
            $minutes = floor($difference / 60);
            return $minutes . " minutes";
        } elseif ($difference < 86400) {
            // Less than a day
            $hours = floor($difference / 3600);
            return $hours . " hours";
        } elseif ($difference < 604800) {
            // Less than a week
            $days = floor($difference / 86400);
            return $days . " days";
        } elseif ($difference < 2592000) {
            // Less than a month
            $weeks = floor($difference / 604800);
            return $weeks . " weeks";
        } else {
            // More than a month
            $months = floor($difference / 2592000);
            return $months . " months";
        }
    }
}
