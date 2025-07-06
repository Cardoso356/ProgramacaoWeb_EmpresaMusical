<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use App\Models\User;

class ResetPasswordController extends Controller
{
    public function updatePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro nos dados informados.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user) use ($request) {
                $user->password = bcrypt($request->password);
                $user->save();
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'Senha redefinida com sucesso!',
            ]);
        }

        return response()->json([
            'message' => 'Erro ao redefinir a senha. Verifique o link ou tente novamente.',
        ], 500);
    }

    public function changePassword(Request $request) //para alterar a senha do usuário com ele já logado
    {
        $validator = Validator::make($request->all(), [
            'passwordAtual' => 'required',
            'novaPassword' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Erro na validação dos dados',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = Auth::user();

        if (!Hash::check($request->passwordAtual, $user->password)) {
            return response()->json([
                'message' => 'A senha atual está incorreta.',
            ], 403);
        }

        $user->password = Hash::make($request->novaPassword);
        $user->save();

        return response()->json([
            'message' => 'Senha alterada com sucesso.',
        ]);
    }
    

}