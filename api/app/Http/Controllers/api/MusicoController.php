<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpRespondeException;
use App\Models\Musico;


class MusicoController extends Controller
{
    public function index(Request $request){

        $page = $request->get('page',1); //se não vier nada começa no 1
        $pageSize = $request->get('pageSize',10); //se não vier nada mostra os registros de 5 em 5
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');


        $query = Musico::select('id','nomeMusico','idade', 'cpf', 'telefone', 'endereco', 'cidade')
                ->whereNull('deleted_at')
                ->orderBy($props, $dir);

        $total = $query->count(); //isso guarda o total de registros que tem na tabela

        $data = $query->offset(($page - 1) * $pageSize) //esse é o cálculo da paginação (paginate)
                      ->limit($pageSize)
                      ->get();


        $totalPages = ceil($total / $pageSize); //esse é o total de páginas



        return response()->json([ //json é de javascript
            'message'=>'Relatório de músicos',
            'status'=>200,
            'page'=>$page,
            'pageSize'=>$pageSize,
            'dir'=>$dir,
            'props'=>$props,
            'search'=>$search,
            'total'=>$total,
            'totalPages'=>$totalPages,
            'data'=>$data,
        ],200);
    }

    public function store(Request $request){ //salvar um registro, para criar uma variável sempre tem de ter o $ na frente dela
        
        $validator = Validator::make($request->all(),[
            'nomeMusico'=>'required|string|max:255', //max é tamanho máximo
            'idade'=>'required|string|min:2',
            'endereco'=>'required|string|max:255',
            'cidade'=>'required|string|max:255',
            'telefone'=>'required|string|min:9',
            'cpf'=>'required|string|max:14',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do músico',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }


         $data = Musico::create([
             'nomeMusico'=>$request->nomeMusico,
             'idade'=>$request->idade,
             'cpf'=>$request->cpf,
             'telefone'=>$request->telefone,
             'endereco'=>$request->endereco,
             'cidade'=>$request->cidade,
             //'senha'=>Hash::make($request->senha),
         ]);

        return response()->json([
            'message'=>'Músico cadastrado com sucesso',
            'data'=>$request,
            'status'=>201,
        ],201);

    }

    public function show(Request $request, string $id){

        
        try{ //o try catch é um tratamento de exceções (erros)

            $data = Musico::findOrFail($id);

            if(!$data){
                throw new HttpResponseException(
                    response()->json('Músico não localizado'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        
        return response()->json([
            'message'=>'Músico localizado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function update(Request $request, string $id){ //atualizar um registro


        $validator = Validator::make($request->all(),[ //valida os dados
            'nomeMusico'=>'required|string|max:255', //max é tamanho máximo
            'idade'=>'required|string|min:2',
            'endereco'=>'required|string|max:255',
            'cidade'=>'required|string|max:255',
            'telefone'=>'required|string|min:9',
            'cpf'=>'required|string|max:14',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do músico',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }

        $data = Musico::find($id); //achei o usuário

        if(!$data){
            return response()->json([
                'message'=>'Músico não localizado',
                'data'=>$id,
                'status'=>404,
            ], 404);
        }

        $data->nomeMusico = $request->nomeMusico ?? $data->nomeMusico;
        $data->cidade = $request->cidade ?? $data->cidade;
        $data->idade = $request->idade ?? $data->idade;
        $data->telefone = $request->telefone ?? $data->telefone;
        $data->endereco = $request->endereco ?? $data->endereco;
        $data->cpf = $request->cpf ?? $data->cpf;

        /*if($request->has('senha')){ //a senha veio ?
            $data->senha = Hash::make($request->senha);
        }*/
        
        $data->save();

        return response()->json([
            'message'=>'Músico alterado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }

    public function destroy(Request $request, string $id){ //deletar

        $data = Musico::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Músico localizado com sucesso',
                'data'=>$id,
                'status'=>404,
            ],404);
    
        }

        $data->delete();

        return response()->json([
            'message'=>'Músico excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

}
