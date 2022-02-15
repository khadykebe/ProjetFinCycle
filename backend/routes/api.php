<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\LogementController;
use App\Http\Controllers\MaisonController;
use App\Http\Controllers\UserController;
use App\Models\Categorie;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

Route::post('login',[UserController::class,'login']);
Route::post('login_client',[UserController::class,'loginClient']);

Route::get('allcategorie', function () {
    $data = Categorie::all();
    return response()->json($data);
});

Route::get('userAuth',function(){
    return Auth::user();
})->middleware("auth:api") ;

Route::post('recherche',[ClientController::class,'recherche']);
Route::post('add_client',[ClientController::class,'addClient']);
Route::get('all_chambre',[LogementController::class,'allchambre']);
Route::get('all_maison',[MaisonController::class,'allMaison']);
Route::get('listRV',[ClientController::class,'listeRV']);
Route::delete('RV/{id}',[ClientController::class,'prendreRV']);

Route::get('Allusers', function () {
    return User::all();

});



Route::middleware(['auth:api'])->group(function(){
    Route::post('add_maison',[MaisonController::class,'AddMaison']);
    Route::get('allUser',[AdminController::class,'allUser']);


    // pour l'admin
    Route::post('add_gerant',[UserController::class,'addUser']);

    //pour gérant

    Route::get('get_maison/{id}',[MaisonController::class,'getMaisonById']);
    Route::delete('delete_maison/{id}',[MaisonController::class,'destroy']);


    Route::post('add_chambre',[LogementController::class,'AddChambre']);
    Route::get('get_chambre/{id}',[LogementController::class,'getChambreById']);
    Route::delete('delete_chambre/{id}',[LogementController::class,'destroy']);
    Route::post('add_RV',[UserController::class,'addRV']);




});







// Route::middleware(['auth:api', 'role:gerant'])->group(function(){
//     Route::post('add_image',[MaisonController::class,'addImage']);
//     Route::get('allImage',[MaisonController::class,'getAllimageByIdMaison']);
// });




