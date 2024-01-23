<?php

namespace App\Jobs;

use App\Events\CompetitionExpired;
use App\Models\Competition;
use App\Models\Notification;
use App\Models\User;
use App\Models\UserNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessExpiredCompetition implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {


        // Get records with expired timestamps
        $expiredCompetitions = Competition::where('end_time', '<', date("Y-m-d H:i:s"))->where('public',1)->get();

        // Dispatch RecordExpired events for each expired record
        foreach ($expiredCompetitions as $record) {
            if(!$record->winners->isNotEmpty()){
            event(new CompetitionExpired($record->id));
            }
        }
    }
}
