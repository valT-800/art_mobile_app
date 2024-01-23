<?php

namespace App\Console;

use App\Events\CompetitionExpired;
use App\Jobs\ProcessExpiredCompetition;
use App\Models\Competition;
use App\Models\Notification;
use App\Models\User;
use App\Models\UserNotification;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        // $schedule->command('inspire')->hourly();
        $schedule->job(new ProcessExpiredCompetition)->everyMinute();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

}
