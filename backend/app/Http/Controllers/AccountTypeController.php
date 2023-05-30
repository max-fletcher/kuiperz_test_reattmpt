<?php

namespace App\Http\Controllers;

use App\Models\AccountType;
use Illuminate\Http\Request;

class AccountTypeController extends Controller
{
    public function index()
    {
        $account_types = AccountType::all();

        return response()->json([
            'status'        => 'success',
            'account_types' => $account_types
        ]);
    }
}
