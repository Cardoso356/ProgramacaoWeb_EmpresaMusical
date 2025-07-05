<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Carbon\Carbon;

class VerifyUserAccount extends Controller
{
    public function verifyUserAccount(Request $request){

        $user = User::where('remember_token',$request->token)->first();

        if($user){ //o usuário existe
            $user->remember_token = null; //achou o usuário. apaga o seu token
            $user->ativo = true;
            $user->email_verified_at = Carbon::now(); //pega a data atual em que fez o acesso
            $user->save();

            return User::sendEmailUserActivated($user);

        }else{
            return User::sendEmailUserActivatedFailed($user);
        }

    }



}
