<?php

declare(strict_types=1);

namespace App\Contracts;

interface Searchable
{
    public function getScoutFilterable(): array;

    public function getScoutSortable(): array;

    /** @return string */
    public function searchableAs();
}
