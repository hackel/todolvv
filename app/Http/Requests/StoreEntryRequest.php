<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\DTOs\CreateEntryDTO;
use App\Models\Entry;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Date;

class StoreEntryRequest extends FormRequest implements DtoRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Entry::class);
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'text'         => 'string',
            'expires_at'   => 'date|nullable',
            'completed_at' => 'date|nullable',
        ];
    }

    public function toDTO(): CreateEntryDTO
    {
        return new CreateEntryDTO(
            text: $this->input('text'),
            expires_at: optional($this->input('expires_at'), fn($v) => Date::parse($v)),
            completed_at: optional($this->input('completed_at'), fn($v) => Date::parse($v)),
        );
    }
}
