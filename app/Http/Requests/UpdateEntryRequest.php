<?php

declare(strict_types=1);

namespace App\Http\Requests;

use App\DTOs\UpdateEntryDTO;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Date;

class UpdateEntryRequest extends FormRequest implements DtoRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('entry'));
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'text' => 'string',
            'expires_at' => 'date|nullable',
            'completed_at' => 'date|nullable',
        ];
    }

    public function toDTO(): UpdateEntryDTO
    {
        return new UpdateEntryDTO(
            text: $this->input('text'),
            expires_at: optional($this->input('expires_at'), fn ($v) => Date::parse($v)),
            completed_at: optional($this->input('completed_at'), fn ($v) => Date::parse($v)),
        );
    }
}
