<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\{Entry, User};
use Illuminate\Auth\Access\{HandlesAuthorization, Response};

class EntryPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return Response::allow();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Entry $entry): bool
    {
        return $entry->user?->is($user);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return Response::allow();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Entry $entry): bool
    {
        return $entry->user?->is($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Entry $entry): bool
    {
        return $entry->user?->is($user);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Entry $entry): bool
    {
        return $entry->user?->is($user);
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Entry $entry): bool
    {
        return $entry->user?->is($user);
    }
}
