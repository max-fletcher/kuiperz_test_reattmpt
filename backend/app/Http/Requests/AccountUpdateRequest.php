<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class AccountUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $account_id = $this->route('account_id');

        return [
            'nid_number'        => ['required', 'string', 'max:255'],
            'email'             => ['required', 'string', 'email:rfc,dns', 'unique:accounts,email,'.$account_id],
            'account_type_id'   => ['required', 'numeric', 'integer', 'exists:account_types,id'],
            'branch_id'         => ['required', 'numeric', 'integer', 'exists:branches,id'],
            'balance'           => ['required', 'numeric', 'integer', 'min:0', 'max:18446744073709551615'],
            'status'            => ['required', 'string', Rule::in(['pending', 'no deposit', 'no withdrawal', 'restricted', 'frozen', 'inactive', 'active'])],
        ];
    }
}
