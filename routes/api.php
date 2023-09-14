<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\PropertyRoomController;
use App\Http\Controllers\Api\RoomController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['name' => 'properties','prefix' => 'property'],function(){
    Route::get('/',[PropertyController::class, 'index'])->name('properties.index'); //I would personally call this properties!
    Route::post('/',[PropertyController::class, 'store'])->name('properties.store');
    Route::delete('/{property}',[PropertyController::class, 'destroy'])->name('properties.delete');
    Route::put('/{property}',[PropertyController::class, 'update'])->name('properties.update');
});

Route::group(['name' => 'rooms','prefix' => 'room'],function(){
    Route::get('/{property}',[PropertyRoomController::class, 'index'])->name('rooms.index-by-property');
    //This is not how I would structure this route if I were designing the API.
    // api/property/{property}/rooms would be better as it allows GET /room/{room} to be available for a Show page

    Route::post('/',[RoomController::class, 'store'])->name('rooms.store');
    Route::put('/{room}',[RoomController::class, 'update'])->name('rooms.update');
    Route::delete('/{room}',[RoomController::class, 'destroy'])->name('rooms.delete');
});
