<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EntryResource extends JsonResource
{
    /**
     * @var \App\Models\Entry
     */
    public $resource;

    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request  $request
     * @mixin \App\Models\Entry
     */
    public function toArray($request): array
    {
        return [
            $this->attributes(['uuid', 'text']),
            'completed_at' => $this->resource->completed_at?->toJSON(),
            'expires_at' => $this->resource->expires_at?->toJSON(),
            'updated_at' => $this->resource->updated_at->toJSON(),
            'created_at' => $this->resource->created_at->toJSON(),
        ];
    }
}
