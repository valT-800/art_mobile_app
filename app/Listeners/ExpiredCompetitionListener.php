<?php

namespace App\Listeners;

use App\Events\CompetitionExpired;
use App\Http\Controllers\API\CompetitionsController;
use App\Models\Competition;
use App\Models\Level;
use App\Models\Notification;
use App\Models\User;
use App\Models\UserNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Log;

class ExpiredCompetitionListener implements ShouldQueue
{
    /**
     * Handle the event.
     */
    public function handle(CompetitionExpired $event)
    {
        $competition = Competition::findOrFail($event->competitionId);
        $mostVotedPost = $competition->posts()->withCount(['users_voted' => function ($query) use ($competition) {
            $query->where('competition_id', $competition->id);
        }])->orderByDesc('users_voted_count')->first();
        if($mostVotedPost!=null)
        {
            $participatedPosts = $competition->posts()->get();
            foreach ($participatedPosts as $post){
                $votes = $post->users_voted()->where('competition_id',$competition->id)->count();
                $participant = $post->user;
                $participant->points = $participant->points + $votes;
                $nextLevel = Level::find($participant->level->id+1);
                if($nextLevel!=null && $participant->points >= $nextLevel->minimal_points)
                {
                    $participant->level()->associate($nextLevel);
                }
                $participant->update();
            if($votes == $mostVotedPost->users_voted_count)
                $post->winnings()->attach($event->competitionId,['created_at'=>now(),'updated_at'=>now()]);
                $user = User::findOrFail($post->user->id);
                $notification=Notification::where('title','Winning')->first();
                $user_notification=UserNotification::create(['related_id'=>$competition->id]);
                $user->notifications()->save($user_notification);
                $notification->users_notifications()->save($user_notification);
            }
            $notification=Notification::where('title','Competition end')->first();
            $gallery = User::findOrFail($competition->user->id);
            $gallery_notification = UserNotification::create(['related_id'=>$competition->id]);
            $gallery->notifications()->save($gallery_notification);
            $notification->users_notifications()->save($gallery_notification);

        
        Log::info('Event handled: ' . json_encode($event->competitionId));
    }
        else {
            
        Log::info('Error: ' . json_encode($event->competitionId));
        }
    }
}
