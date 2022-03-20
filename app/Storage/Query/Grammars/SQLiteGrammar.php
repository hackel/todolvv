<?php

declare(strict_types=1);

namespace App\Storage\Query\Grammars;

final class SQLiteGrammar extends \Illuminate\Database\Query\Grammars\SQLiteGrammar
{
    /**
     * Add microseconds to the date serialization format.
     */
    public function getDateFormat(): string
    {
        return 'Y-m-d H:i:s.u';
    }
}
