<?php

declare(strict_types=1);

namespace App\Services;

use App\DTOs\{CreateEntryDTO, UpdateEntryDTO};
use App\Models\{Entry, User};

final class EntryManager
{
    public function create(User $user, CreateEntryDTO $dto): Entry
    {
        return $user->entries()->create($dto->all());
    }

    public function update(Entry $entry, UpdateEntryDTO $dto): Entry
    {
        $entry->update($dto->all());

        return $entry;
    }

    public function delete(Entry $entry): void
    {
        $entry->delete();
    }
}
