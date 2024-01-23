<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CompetitionExpired
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $competitionId;
    /**
     * Create a new event instance.
     */
    public function __construct($id)
    {
        $this->competitionId=$id;
    }
}
