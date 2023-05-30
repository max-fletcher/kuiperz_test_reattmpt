<h1>Dear Customer</h1>

<p>Email: {{ $info->email }} <br>
   Branch: {{ $info->branch->name }}
   A/C Number: {{ $info->account_number }}
   A/C Type: {{ $info->account_type->name }}
</p>

<br>

<p>
   Your current account balance is {{ $info->balance }} as of {{ \Carbon\Carbon::now()->format('d-m-Y g:i A') }}. 
   Let us know if there are any inconsistencies or if we can help you in anyway.
</p>

<br>

<p>Regards, Some Bank</p>