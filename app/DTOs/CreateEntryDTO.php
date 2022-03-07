<?php

declare(strict_types=1);

namespace App\DTOs;

use Carbon\CarbonImmutable;
use Spatie\DataTransferObject\DataTransferObject;

final class CreateEntryDTO extends DataTransferObject
{
    public string $text;
    public ?CarbonImmutable $expires_at;
    public ?CarbonImmutable $completed_at;
}
