<?php

declare(strict_types=1);

namespace App\Providers;

use App\Storage\Query\Grammars\{MysqlGrammar, SQLiteGrammar};
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Use custom query grammar that adds microseconds to date serialization format.
        // @phpstan-ignore-next-line
        match ($this->app->make('db.connection')->getDriverName()) {
            'mysql' => $this->app->make('db.connection')->setQueryGrammar(new MysqlGrammar()),
            'sqlite' => $this->app->make('db.connection')->setQueryGrammar(new SQLiteGrammar())
        };
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Date::use(CarbonImmutable::class);
    }
}
