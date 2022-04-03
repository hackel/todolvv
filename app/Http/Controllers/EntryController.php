<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Resources\EntryResource;
use App\Models\Entry;
use Illuminate\Http\Request;
use Inertia\{Inertia, Response};

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     //
    // }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function create()
    // {
    //     //
    // }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    // public function store(Request $request)
    // {
    //     //
    // }

    /**
     * Display the specified resource.
     */
    public function show(Entry $entry): Response
    {
        return Inertia::render('Entries/Show', [
            'entry' => EntryResource::make($entry),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function edit(Entry $entry)
    // {
    //     //
    // }

    /**
     * Update the specified resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    // public function update(Request $request, Entry $entry)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    // public function destroy(Entry $entry)
    // {
    //     //
    // }
}
