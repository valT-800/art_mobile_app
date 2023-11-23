<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PostResource extends JsonResource
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
                'id' => $this->user->id,
                'username' => $this->user->username,
                'profile_photo_url' => $this->user->profile_photo_url,

            ],
            'comments' => $this->comments,
            'competitions' => $this->competitions->map(function ($item) {

                return ['id' => $item->id, 'title' => $item->title];
            }),
            'tags' => $this->tags->map(function ($item) {
                return ['id' => $item->id, 'tag' => $item->tag];
            }),
            'created_at' => $this->getTimeDifference($this->created_at->timestamp),
            $this->merge(['language' => $this->language]),
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
