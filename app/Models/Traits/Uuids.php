<?php

declare(strict_types=1);

namespace App\Models\Traits;

use Illuminate\Support\Str;

trait Uuids
{
    public function initializeUuids(): void
    {
        $this->attributes['id'] = Str::orderedUuid();
    }
}
