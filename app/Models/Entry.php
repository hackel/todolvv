<?php

declare(strict_types=1);

namespace App\Models;

use Dyrynda\Database\Casts\EfficientUuid;
use Dyrynda\Database\Support\{BindsOnUuid, GeneratesUuid};
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
class Entry extends Model
{
    use BindsOnUuid;
    use GeneratesUuid;
    use HasFactory;

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

    protected $dateFormat = 'Y-m-d\TH:i:s.u';

    /** @var string */
    protected $uuidVersion = 'ordered';

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
