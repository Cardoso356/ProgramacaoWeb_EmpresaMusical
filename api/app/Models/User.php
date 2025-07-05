<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [ //esses são os campos em que o usuário tem para atualizar em massa
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [ //esses são os campos em que nós não queremos mostrar na resposta
        'password',
        'remember_token',
        'updated_at',
        'created_at',
        'deleted_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function autor(){ //Relacionamento com a tabela Autor, um usuário está associado a um autor (relacionamento um para um)
        $this->hasOne(Autor::class);
    }


    //essa parte é referente ao RegisterUserController para o mailHog
    public static function sendVerificationEmail($user){

        $activateCode = bcrypt(Str::random(15)); //cria uma string aleatória de 15 caracteres
        $user->remember_token = $activateCode;
        $user->save(); //salva o usuário

        //vamos estilizar a página dos emails:
        $viewData['Nome'] = $user->name; //pega o nome do usuário
        $emailCode = $user->remember_token;
        $viewData['link'] = asset('/api/verify_account?token'.$emailCode);
        Mail::send('layouts.email_verification', $viewData, function($n) use ($user){
            $n->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'));
            $n->to($user->email, $user->name)->subject('E-mail de confirmação de registro no sistema');
            
        });   

    }


    public static function sendEmailUserActivated($user){
        $viewData['Nome'] = $user->name; //pega o nome do usuário
        $viewData['link'] = asset('http://localhost:3000/login');
        Mail::send('layouts.email_verification', $viewData, function($n) use ($user){
            $n->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'));
            $n->to($user->email, $user->name)->subject('Usuário devidamente registrado e liberado para acesso');
            
        }); 
    }


    public static function sendEmailUserActivatedFailed($user){
        $viewData['Nome'] = $user->name; //pega o nome do usuário
        Mail::send('layouts.email_verification', $viewData, function($n) use ($user){
            $n->from(env('MAIL_FROM_ADDRESS'), env('APP_NAME'));
            $n->to($user->email, $user->name)->subject('Usuário já está ativado no sistema ou o link está expirado');
            
        }); 
    }




}
