<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpRespondeException;
use App\Models\Instrumento;

class InstrumentoController extends Controller
{
    public function index(Request $request){

        $page = $request->get('page',1); //se não vier nada começa no 1
        $pageSize = $request->get('pageSize',20); //se não vier nada mostra os registros de 5 em 5
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');


        $query = Instrumento::select('id','nomeInstrumento','tipo','marca','modelo')
                ->whereNull('deleted_at')
                ->orderBy($props, $dir);

        $total = $query->count(); //isso guarda o total de registros que tem na tabela

        $data = $query->offset(($page - 1) * $pageSize) //esse é o cálculo da paginação (paginate)
                      ->limit($pageSize)
                      ->get();


        $totalPages = ceil($total / $pageSize); //esse é o total de páginas



        return response()->json([ //json é de javascript
            'message'=>'Relatório de instrumentos',
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
            'nomeInstrumento'=>'required|string|max:255', //max é tamanho máximo
            'tipo'=>'required|string|max:255',
            'marca'=>'required|string|max:255',
            'modelo'=>'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do instrumento',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }


        $data = Instrumento::create([
            'nomeInstrumento'=>$request->nomeInstrumento,
            'tipo'=>$request->tipo,
            'marca'=>$request->marca,
            'modelo'=>$request->modelo,
        ]);

        return response()->json([
            'message'=>'Instrumento cadastrado com sucesso',
            'data'=>$data,
            'status'=>201,
        ],201);

    }

    public function show(Request $request, string $id){

        
        try{ //o try catch é um tratamento de exceções (erros)

            $data = Instrumento::findOrFail($id);

            if(!$data){
                throw new HttpResponseException(
                    response()->json('Instrumento não localizado'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        
        return response()->json([
            'message'=>'Instrumento localizado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function update(Request $request, string $id){ //atualizar um registro


        $validator = Validator::make($request->all(),[ //valida os dados
            'nomeInstrumento'=>'required|string|max:255', //max é tamanho máximo
            'tipo'=>'required|string|max:255',
            'marca'=>'required|string|max:255',
            'modelo'=>'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do instrumento',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }

        $data = Instrumento::find($id); //achei o usuário

        if(!$data){
            return response()->json([
                'message'=>'Instrumento não localizado',
                'data'=>$id,
                'status'=>404,
            ], 404);
        }

        $data->nomeInstrumento = $request->nomeInstrumento ?? $data->nomeInstrumento;
        $data->tipo = $request->tipo ?? $data->tipo;
        $data->marca = $request->marca ?? $data->marca;
        $data->modelo = $request->modelo ?? $data->modelo;

        /*if($request->has('senha')){ //a senha veio ?
            $data->senha = Hash::make($request->senha);
        }*/
        
        $data->save();

        return response()->json([
            'message'=>'Instrumento alterado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }

    public function destroy(Request $request, string $id){ //deletar

        $data = Instrumento::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Instrumento localizado com sucesso',
                'data'=>$id,
                'status'=>404,
            ],404);
    
        }

        $data->delete();

        return response()->json([
            'message'=>'Instrumento excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }
}
