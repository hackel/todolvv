<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Middleware;
use MeiliSearch\Client;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return vite()->getHash();
    }

    /**
     * Defines the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
                'meiliSearchToken' => $this->getMeiliSearchToken($request),
            ],
            'versions' => [
                'php' => PHP_VERSION,
                'laravel' => \Illuminate\Foundation\Application::VERSION,
            ],
        ]);
    }

    /**
     * Generate a search token to restrict searches to a specific user_id.
     */
    private function getMeiliSearchToken(Request $request): ?string
    {
        if (config('scout.driver') !== 'meilisearch' || !$request->user()) {
            return null;
        }

        $searchRules = (object) [
            'entries' => (object) [
                'filter' => "user_id = {$request->user()->id}",
            ],
        ];
        $options = [
            'apiKey' => config('scout.meilisearch.search_key'),
            'expiresAt' => Date::now()->addDay(),
        ];

        return app(Client::class)->generateTenantToken($searchRules, $options);
    }
}
