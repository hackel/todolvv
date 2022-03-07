<?php

declare(strict_types=1);

use App\Models\{Entry, User};
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Date;
use function Pest\Laravel\{actingAs, assertDatabaseHas, assertDatabaseMissing};

uses(RefreshDatabase::class);

beforeEach(fn() => $this->user = User::factory()->create());

it('retrieves a list of entries for the current user', function () {
    /** @var \Illuminate\Database\Eloquent\Collection<int, Entry> $entries */
    $entries = Entry::factory()
        ->count(10)
        ->for($this->user)
        ->create();

    $response = actingAs($this->user)->getJson(route('entry.index'));

    $response->assertStatus(200)
        ->assertSessionHasNoErrors()
        ->assertJsonStructure([
            'data' => [
                '*' => [
                    'text',
                    'completed_at',
                    'expires_at',
                    'updated_at',
                    'created_at',
                ],
            ],
        ])
        ->assertJsonCount(10, 'data');

    $entries->each(
        fn($entry) => $response->assertJsonFragment(
            $entry->only('text', 'completed_at', 'expires_at', 'updated_at', 'created_at')
        )
    );
});

it('creates a new Todo Entry', function () {
    $expected = Entry::factory()->make()->toArray();

    $response = actingAs($this->user)->postJson(route('entry.store'), $expected);

    $response
        ->assertStatus(201)
        ->assertSessionHasNoErrors()
        ->assertJsonStructure([
            'data' => [
                'uuid',
                'text',
                'completed_at',
                'expires_at',
                'updated_at',
                'created_at',
            ],
        ])
        ->assertJson(['data' => $expected]);
});

it('updates an existing Todo Entry', function () {
    $entry = Entry::factory()->for($this->user)->create(['updated_at' => Date::now()->subDay()]);
    $original = $entry->toArray();
    $expected = Entry::factory()->make()->toArray();

    $response = actingAs($this->user)->putJson(route('entry.update', $entry), $expected);

    $response
        ->assertStatus(200)
        ->assertSessionHasNoErrors()
        ->assertJsonStructure([
            'data' => [
                'uuid',
                'text',
                'completed_at',
                'expires_at',
                'updated_at',
                'created_at',
            ],
        ])
        ->assertJson(['data' => $expected]);

    expect($response->json('data.updated_at'))->toBeAfter($original['updated_at']);

    assertDatabaseHas('entries', [
        'user_id' => $this->user->id,
        ...$expected,
    ]);
});

it('deletes an existing Todo Entry', function () {
    $entry = Entry::factory()->for($this->user)->create(['updated_at' => Date::now()->subDay()]);

    $response = actingAs($this->user)->deleteJson(route('entry.destroy', $entry));

    $response
        ->assertStatus(204)
        ->assertSessionHasNoErrors()
        ->assertNoContent();

    assertDatabaseMissing('entries', [
        'id' => $entry->id,
    ]);
});
