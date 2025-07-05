<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Http\Request;

class ForgotPasswordController extends Controller
{
    public function forgotPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        // Gera um link apontando para a tela do React: /updatepassword
        ResetPassword::createUrlUsing(function ($user, string $token) {
            return 'http://localhost:3000/updatepassword?token=' . $token . '&email=' . urlencode($user->email);
        });

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Um link de redefinição foi enviado para seu e-mail.'])
            : response()->json(['message' => 'Erro ao enviar e-mail de redefinição.'], 500);
    }
}
