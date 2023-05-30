<?php

namespace App\Console\Commands;

use App\Models\Account;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendAccountStatementMail;

class SendAccountStatementEmailToCustomersCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:send-account-statement-email-to-customers-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'For sending monthly account statements to every user at the end of every month';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $accounts = Account::with('account_type', 'branch')->get();

        foreach($accounts as $account){
            Mail::to($account->email)->send(new SendAccountStatementMail($account));
        }
    }
}
