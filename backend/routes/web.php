<?php

use Illuminate\Support\Facades\Route;


use App\Models\Account;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendAccountStatementMail;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// FOR TESTING MAIL
// Route::get('/test', function () {
//     $account = Account::with('account_type', 'branch')->first();
//     Mail::to($account->email)->send(new SendAccountStatementMail($account));
//     dd('sent');
// });

Route::get('/', function () {
    return view('welcome');
});
