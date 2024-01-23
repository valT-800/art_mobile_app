<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CompetitionResource extends JsonResource
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
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'starts_in' => $this->public==1 ? $this->getTimeDifference(strtotime($this->start_time)) : null,
            'ends_in' => $this->public==1 ? $this->getTimeDifference(strtotime($this->end_time)) : null,
            'user' => [
                'id' => $this->user->id,
                'username' => $this->user->username,
                'profile_photo_url' => $this->user->profile_photo_url,
            ],
            'public' => $this->public,
            'posts' => $this->posts->count(),
            'post' => new PostResource($this->posts->first()),
            'winners' => $this->winners->map(function ($item) {
                return ['id' => $item->id, 'url' => $item->url];
            }),
            $this->merge(['language' => $this->language])
        ];
    }
    private function getTimeDifference($timestamp)
    {
        $now = time();  // Current timestamp
        if($timestamp > $now)
        {
            $difference = $timestamp - $now;  // Time difference in seconds
            return $difference . '';
        }
        else
        {
            return null;
        }
    }
}
