<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\AccountTypeController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\CategoryController;

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

// KUIPERZ TEST ROUTES
Route::get('/account_types/index', [AccountTypeController::class, 'index']);

Route::get('/branches/index', [BranchController::class, 'index']);

Route::get('/accounts/index', [AccountController::class, 'index']);
Route::post('/accounts/store', [AccountController::class, 'store']);
Route::get('/accounts/show/{account_id}', [AccountController::class, 'show']);
Route::patch('/accounts/update/{account_id}', [AccountController::class, 'update']);
Route::delete('/accounts/delete/{account_id}', [AccountController::class, 'destroy']);

Route::any('{any}', function(){
        return response()->json([
            'status'    => 'failed',
            'message'   => 'Page Not Found.',
        ], 404);
    })->where('any', '.*');

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::post('/signup', [AuthController::class, 'signup']);
// Route::post('/login', [AuthController::class, 'login']);
// Route::get('/logout', [AuthController::class, 'logout']);

// Route::get('/posts/index', [PostController::class, 'index']);
// Route::post('/posts/store', [PostController::class, 'store']);
// Route::get('/posts/show/{post_id}', [PostController::class, 'show']);
// Route::patch('/posts/update/{post_id}', [PostController::class, 'update']);
// Route::delete('/posts/delete/{post_id}', [PostController::class, 'delete']);

// Route::get('/categories/index', [CategoryController::class, 'index']);

// KUIPERZ TEST ROUTES
Route::get('/account_types/index', [AccountTypeController::class, 'index']);

Route::get('/branches/index', [BranchController::class, 'index']);

Route::get('/accounts/index', [AccountController::class, 'index']);
Route::post('/accounts/store', [AccountController::class, 'store']);
Route::get('/accounts/show/{account_id}', [AccountController::class, 'show']);
Route::patch('/accounts/update/{account_id}', [AccountController::class, 'update']);
Route::delete('/accounts/delete/{account_id}', [AccountController::class, 'destroy']);

Route::any('{any}', function(){
        return response()->json([
            'status'    => 'failed',
            'message'   => 'Page Not Found.',
        ], 404);
    })->where('any', '.*');
