<?php

declare(strict_types=1);

use App\Http\Controllers\API\EntryController;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(static function (Router $route): void {
    $route->get('/user', fn (Request $request) => $request->user());

    $route->apiResource('entry', EntryController::class);
});
