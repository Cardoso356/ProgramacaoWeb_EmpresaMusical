<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class RegisterUserController extends Controller
{
    public function signup (Request $request){

        // Mapeia o campo do frontend para o nome esperado pela validação
        $request->merge([
            'password_confirmation' => $request->confirmPassword
        ]);

        $validator = Validator::make($request->all(),[
            'name'=>'required|string',
            'email'=>'required|email|unique:users,email',
            'password'=>'required|string|min:6|confirmed', //o confirmed é para confirmar a senha
        ]);


        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nos dados informados pelo usuário',
                'erros'=>$validator->errors(),
            ]);
        }


        $user = User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>bcrypt($request->password), //criptografa a senha esse bcrypt
        ]);

        /*if ($user) {
            User::sendEmailUserActivated($user);  // aqui o $user é o que foi criado, com email correto
        }*/


        //validação do usuário
        $token = $user->createToken('main')->plainTextToken;

        if($user){ //se deu tudo certo
            User::sendVerificationEmail($user);
            return response()->json([
                'message'=>'Verifique seu endereço de e-mail',
                'token'=>$token,
            ]);
        } else {
            return response()->json([
                'message'=>'Erro de cadastro do usuário, erro no servidor, tente novamente mais tarde',
                'status'=>500,
            ]);
        }



    }









}
