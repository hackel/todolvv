<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Spatie\DataTransferObject\DataTransferObject;

interface DtoRequest
{
    /**
     * @throws \Spatie\DataTransferObject\Exceptions\UnknownProperties
     */
    public function toDTO(): DataTransferObject;
}
