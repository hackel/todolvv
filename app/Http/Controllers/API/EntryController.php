<?php

declare(strict_types=1);

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\{StoreEntryRequest, UpdateEntryRequest};
use App\Http\Resources\EntryResource;
use App\Models\Entry;
use App\Services\EntryManager;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\{Request, Response};
use Spatie\QueryBuilder\QueryBuilder;
use function response;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $entries = QueryBuilder::for(Entry::class)
            ->allowedSorts(['created_at', 'updated_at', 'expires_at'])
            ->where('user_id', $request->user()->id)
            ->get();

        return EntryResource::collection($entries);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEntryRequest $request, EntryManager $entryManager): EntryResource
    {
        $entry = $entryManager->create($request->user(), $request->toDTO());

        return EntryResource::make($entry);
    }

    /**
     * Display the specified resource.
     */
    public function show(Entry $entry): EntryResource
    {
        return EntryResource::make($entry);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateEntryRequest $request,
        Entry $entry,
        EntryManager $entryManager,
    ): EntryResource {
        $entryManager->update($entry, $request->toDTO());

        return EntryResource::make($entry);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entry $entry, EntryManager $entryManager): Response
    {
        $entryManager->delete($entry);

        return response()->noContent();
    }
}
