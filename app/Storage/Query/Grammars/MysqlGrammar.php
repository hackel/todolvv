<?php

declare(strict_types=1);

namespace App\Storage\Query\Grammars;

final class MysqlGrammar extends \Illuminate\Database\Query\Grammars\MySqlGrammar
{
    /**
     * Add microseconds to the date serialization format.
     */
    public function getDateFormat(): string
    {
        return 'Y-m-d H:i:s.u';
    }
}
