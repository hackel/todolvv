<?php

declare(strict_types=1);

namespace App\Models;

use App\Contracts\Searchable as SearchableContract;
use Dyrynda\Database\Casts\EfficientUuid;
use Dyrynda\Database\Support\{BindsOnUuid, GeneratesUuid};
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

/**
 * @property int                      $id
 * @property string                   $uuid
 * @property int                      $user_id
 * @property ?\App\Models\User        $user
 * @property string                   $text
 * @property ?\Carbon\CarbonImmutable $completed_at
 * @property ?\Carbon\CarbonImmutable $expires_at
 * @property \Carbon\CarbonImmutable  $updated_at
 * @property \Carbon\CarbonImmutable  $created_at
 */
class Entry extends Model implements SearchableContract
{
    use BindsOnUuid;
    use GeneratesUuid;
    use HasFactory;
    use Searchable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['text', 'completed_at', 'expires_at'];

    protected $casts = [
        'uuid' => EfficientUuid::class,
        'completed_at' => 'immutable_datetime',
        'expires_at' => 'immutable_datetime',
    ];

    protected $dateFormat = 'Y-m-d H:i:s.u';

    /** @var string */
    protected $uuidVersion = 'ordered';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getIsCompleteAttribute(): bool
    {
        return $this->completed_at !== null;
    }

    public function getIsExpiredAttribute(): bool
    {
        return (bool) $this->expires_at?->isPast();
    }

    /**
     * Get the indexable data array for the model.
     */
    public function toSearchableArray(): array
    {
        return $this->only(['uuid', 'user_id', 'text', 'is_complete', 'is_expired', 'expires_at']);
    }

    public function getScoutFilterable(): array
    {
        return ['user_id'];
    }

    public function getScoutSortable(): array
    {
        return ['expires_at'];
    }
}
