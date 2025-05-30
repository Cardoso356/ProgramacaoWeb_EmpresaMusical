<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpRespondeException;
use App\Models\MusicoInstrumento;

class MusicoInstrumentoController extends Controller
{
    public function index(Request $request){ //lista de itens cadastrados

        //precisamos saber qual página o usuário está, o tamanho da página (número de registros que vai mostrar pra ele)
        //vai mostrar os registros em ordem crescente, decrescente, etc
        //vai pesquisar por qual campo: nome, email, etc

        $page = $request->get('page',1); //se não vier nada começa no 1
        $pageSize = $request->get('pageSize',10); //se não vier nada mostra os registros de 5 em 5
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');


        //$query = MusicoInstrumento::select('id','musicoId','instrumentoId')
        $query = MusicoInstrumento::with('musico:id,nomeMusico','instrumento:id,nomeInstrumento') //traz as informações das tabelas musico e instrumento, só os nomes e os ids deles
                ->whereNull('deleted_at')
                ->orderBy($props, $dir);

        $total = $query->count(); //isso guarda o total de registros que tem na tabela

        $data = $query->offset(($page - 1) * $pageSize) //esse é o cálculo da paginação (paginate)
                      ->limit($pageSize)
                      ->get();


        $totalPages = ceil($total / $pageSize); //esse é o total de páginas



        return response()->json([ //json é de javascript
            'message'=>'Relatório de músicos - instrumentos associados',
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
            'musicoId'=>'required|string|max:255',
            'instrumentoId'=>'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do músico - instrumento associados',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }


        $data = MusicoInstrumento::create([
            'musicoId'=>$request->musicoId,
            'instrumentoId'=>$request->instrumentoId,
        ]);

        return response()->json([
            'message'=>'Relação de músico - instrumento cadastrado com sucesso',
            'data'=>$data,
            'status'=>201,
        ],201);

    }

    public function show(Request $request, string $id){

        
        try{ //o try catch é um tratamento de exceções (erros)

            //$data = MusicoInstrumento::findOrFail($id);
            $data = MusicoInstrumento::with('musico:id,nomeMusico','instrumento:id,nomeInstrumento')->findOrFail($id);

            if(!$data){
                throw new HttpResponseException(
                    response()->json('Relação de músico - instrumento não localizado'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        
        return response()->json([
            'message'=>'Relação de músico - instrumento localizado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function update(Request $request, string $id){ //atualizar um registro


        $validator = Validator::make($request->all(),[ //valida os dados
            'musicoId'=>'required|string|max:255',
            'instrumentoId'=>'required|string|max:255',
            
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do músico - instrumento',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }

        $data = MusicoInstrumento::find($id); //achei o usuário

        if(!$data){
            return response()->json([
                'message'=>'Relação de músico - instrumento não localizado',
                'data'=>$id,
                'status'=>404,
            ], 404);
        }

        $data->musicoId = $request->musicoId ?? $data->musicoId;
        $data->instrumentoId = $request->instrumentoId ?? $data->instrumentoId;

        /*if($request->has('password')){ //a senha veio ?
            $data->password = Hash::make($request->password);
        }*/
        
        $data->save();

        return response()->json([
            'message'=>'Relação de músico - instrumento alterado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }

    public function destroy(Request $request, string $id){ //deletar

        $data = MusicoInstrumento::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Relação de músico - instrumento localizado com sucesso',
                'data'=>$id,
                'status'=>404,
            ],404);
    
        }

        $data->delete();

        return response()->json([
            'message'=>'Relação de músico - instrumento excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }
}
