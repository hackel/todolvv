<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Contracts\Searchable;
use Illuminate\Console\Events\CommandFinished;
use MeiliSearch\Client;

/**
 * Update the Meilisearch index settings to add filters and sortable fields
 * defined in the model after running an import.
 */
class UpdateMeilisearchSettings
{
    /**
     * Create the event listener.
     */
    public function __construct(private Client $client)
    {
    }

    /**
     * Handle the event.
     */
    public function handle(CommandFinished $event): void
    {
        if ($event->command !== 'scout:import' || $event->exitCode !== 0) {
            return;
        }

        $modelClass = $event->input->getArgument('model');

        $model = new $modelClass();

        if (!$model instanceof Searchable) {
            throw new \InvalidArgumentException(
                "The given model ({$modelClass}) does not implement the Searchable interface.",
            );
        }

        $index = $model->searchableAs();

        $this->client->index($index)->updateFilterableAttributes($model->getScoutFilterable());
        $this->client->index($index)->updateSortableAttributes($model->getScoutSortable());
    }
}
