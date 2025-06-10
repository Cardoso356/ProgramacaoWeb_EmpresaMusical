<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class SignupController extends Controller
{
    public function register(Request $request)
    {
        // Validação dos dados
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        // Se a validação falhar
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro nas informações do cadastro',
                'data' => $validator->errors(),
                'status' => 404
            ], 404);
        }

        // Criação do usuário
        $user = User::create([
            'name'=> $request->name,
            'email'=> $request->email,
            'password'=> Hash::make($request->password),
        ]);

        // Retorno de sucesso
        return response()->json([
            'message' => 'Usuário cadastrado com sucesso',
            'data'    => $user,
            'status'  => 201,
        ], 201);
    }
}
