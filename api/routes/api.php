<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\MusicoController;
use App\Http\Controllers\api\AlbumController;
use App\Http\Controllers\api\InstrumentoController;
use App\Http\Controllers\api\MusicaController;
use App\Http\Controllers\api\MusicoInstrumentoController;
use App\Http\Controllers\api\MusicoAlbumController;


Route::get('/musico', function (Request $request) {
    return $request->musico();
})->middleware('auth:sanctum');

//colocamos aqui as rotas determinadas da api
Route::prefix('musico')->group(function (){

    Route::get('/index',[MusicoController::class,'index']); //para pegar
    Route::get('/show/{id}',[MusicoController::class,'show']); //para pegar

    Route::post('/store',[MusicoController::class,'store']); //para postar/enviar
    Route::put('/update/{id}',[MusicoController::class,'update']); //para alterar

    Route::delete('/destroy/{id}',[MusicoController::class,'destroy']); //para pegar
});



Route::get('/album', function (Request $request) {
    return $request->album();
})->middleware('auth:sanctum');

//colocamos aqui as rotas determinadas da api
Route::prefix('album')->group(function (){

    Route::get('/index',[AlbumController::class,'index']); //para pegar
    Route::get('/show/{id}',[AlbumController::class,'show']); //para pegar

    Route::post('/store',[AlbumController::class,'store']); //para postar/enviar
    Route::put('/update/{id}',[AlbumController::class,'update']); //para alterar

    Route::delete('/destroy/{id}',[AlbumController::class,'destroy']); //para pegar
});



Route::get('/instrumento', function (Request $request) {
    return $request->instrumento();
})->middleware('auth:sanctum');

//colocamos aqui as rotas determinadas da api
Route::prefix('instrumento')->group(function (){

    Route::get('/index',[InstrumentoController::class,'index']); //para pegar
    Route::get('/show/{id}',[InstrumentoController::class,'show']); //para pegar

    Route::post('/store',[InstrumentoController::class,'store']); //para postar/enviar
    Route::put('/update/{id}',[InstrumentoController::class,'update']); //para alterar

    Route::delete('/destroy/{id}',[InstrumentoController::class,'destroy']); //para pegar
});


Route::get('/musica', function (Request $request) {
    return $request->musica();
})->middleware('auth:sanctum');

//colocamos aqui as rotas determinadas da api
Route::prefix('musica')->group(function (){

    Route::get('/index',[MusicaController::class,'index']); //para pegar
    Route::get('/show/{id}',[MusicaController::class,'show']); //para pegar

    Route::post('/store',[MusicaController::class,'store']); //para postar/enviar
    Route::put('/update/{id}',[MusicaController::class,'update']); //para alterar

    Route::delete('/destroy/{id}',[MusicaController::class,'destroy']); //para pegar
});


Route::get('/musicoinstrumento', function (Request $request) {
    return $request->musicoinstrumento();
})->middleware('auth:sanctum');

//colocamos aqui as rotas determinadas da api
Route::prefix('musicoinstrumento')->group(function (){

    Route::get('/index',[MusicoInstrumentoController::class,'index']); //para pegar
    Route::get('/show/{id}',[MusicoInstrumentoController::class,'show']); //para pegar

    Route::post('/store',[MusicoInstrumentoController::class,'store']); //para postar/enviar
    Route::put('/update/{id}',[MusicoInstrumentoController::class,'update']); //para alterar

    Route::delete('/destroy/{id}',[MusicoInstrumentoController::class,'destroy']); //para pegar
});


Route::get('/musicoalbum', function (Request $request) {
    return $request->musicoalbum();
})->middleware('auth:sanctum');

//colocamos aqui as rotas determinadas da api
Route::prefix('musicoalbum')->group(function (){

    Route::get('/index',[MusicoAlbumController::class,'index']); //para pegar
    Route::get('/show/{id}',[MusicoAlbumController::class,'show']); //para pegar

    Route::post('/store',[MusicoAlbumController::class,'store']); //para postar/enviar
    Route::put('/update/{id}',[MusicoAlbumController::class,'update']); //para alterar

    Route::delete('/destroy/{id}',[MusicoAlbumController::class,'destroy']); //para pegar
});
