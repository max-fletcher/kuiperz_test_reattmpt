<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountStoreRequest;
use App\Http\Requests\AccountUpdateRequest;
use App\Models\Account;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index()
    {
        $accounts = Account::with('account_type', 'branch')->get();

        return response()->json([
            'status'    => 'success',
            'accounts'  => $accounts
        ]);
    }

    public function store(AccountStoreRequest $request)
    {
        $validated = $request->validated();

        do {
            $account_number = rand(1000000000, 9999999999);
            $account = Account::where('account_number', $account_number)->first();
        } while ($account);

        $validated['account_number'] = $account_number;

        Account::create($validated);

        return response()->json([
            'status'    => 'success',
            'message'   => 'Account created successfully!',
        ], 201);
    }

    public function show(string $account_id)
    {
        $account = Account::with('account_type', 'branch')->where('id', $account_id)->first();

        if(!$account){
            return response()->json([
                'status'    => 'failed',
                'message'   => 'Account not found!',
            ], 404);
        }

        return response()->json([
            'status'    => 'success',
            'account'   => $account,
        ]);
    }

    public function update(AccountUpdateRequest $request, string $account_id)
    {
        $account = Account::find($account_id);

        if(!$account){
            return response()->json([
                'status'    => 'failed',
                'message'   => 'Account not found!',
            ], 404);
        }

        $validated = $request->validated();

        $account->update($validated);

        return response()->json([
            'status'    => 'success',
            'message'   => 'Account updated successfully!',
        ]);
    }

    public function destroy(string $account_id)
    {
        $account_deleted = Account::where('id', $account_id)->delete();

        if(!$account_deleted){
            return response()->json([
                'status'    => 'failed',
                'message'   => 'Account not found!',
            ], 404);
        }

        return response()->json([
            'status'    => 'success',
            'message'   => 'Account deleted successfully!',
        ]);
    }
}
