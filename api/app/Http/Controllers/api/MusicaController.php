<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpRespondeException;
use App\Models\Musica;

class MusicaController extends Controller
{
    public function index(Request $request){

        $page = $request->get('page',1); //se não vier nada começa no 1
        $pageSize = $request->get('pageSize',20); //se não vier nada mostra os registros de 5 em 5
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');


       // $query = Musica::select('id','nomeMusica','genero','gravadora','albumId')
        $query = Musica::with('album:id,tituloAlbum') //para poder trazer o titulo do album associado apenas que é o que queremos
                ->whereNull('deleted_at')
                ->orderBy($props, $dir);

        $total = $query->count(); //isso guarda o total de registros que tem na tabela

        $data = $query->offset(($page - 1) * $pageSize) //esse é o cálculo da paginação (paginate)
                      ->limit($pageSize)
                      ->get();


        $totalPages = ceil($total / $pageSize); //esse é o total de páginas



        return response()->json([ //json é de javascript
            'message'=>'Relatório de músicas',
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
            'nomeMusica'=>'required|string|max:255', //max é tamanho máximo
            'genero'=>'required|string|max:255',
            'gravadora'=>'required|string|max:255',
            'albumId'=>'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações da música',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }


        $data = Musica::create([
            'nomeMusica'=>$request->nomeMusica,
            'genero'=>$request->genero,
            'gravadora'=>$request->gravadora,
            'albumId'=>$request->albumId,
        ]);

        return response()->json([
            'message'=>'Música cadastrada com sucesso',
            'data'=>$data,
            'status'=>201,
        ],201);

    }

    public function show(Request $request, string $id){

        
        try{ //o try catch é um tratamento de exceções (erros)

            //$data = Musica::findOrFail($id);
            $data = Musica::with('album:id,tituloAlbum')->findOrFail($id); //é o relacionamento com album para mostrar o título do album

            if(!$data){
                throw new HttpResponseException(
                    response()->json('Música não localizada'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        
        return response()->json([
            'message'=>'Música localizada com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function update(Request $request, string $id){ //atualizar um registro


        $validator = Validator::make($request->all(),[ //valida os dados
            'nomeMusica'=>'required|string|max:255', //max é tamanho máximo
            'genero'=>'required|string|max:255',
            'gravadora'=>'required|string|max:255',
            'albumId'=>'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações da música',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }

        $data = Musica::find($id); //achei o usuário

        if(!$data){
            return response()->json([
                'message'=>'Música não localizada',
                'data'=>$id,
                'status'=>404,
            ], 404);
        }

        $data->nomeMusica = $request->nomeMusica ?? $data->nomeMusica;
        $data->gravadora = $request->gravadora ?? $data->gravadora;
        $data->genero = $request->genero ?? $data->genero;
        $data->albumId = $request->albumId ?? $data->albumId;

        /*if($request->has('password')){ //a senha veio ?
            $data->password = Hash::make($request->password);
        }*/
        
        $data->save();

        return response()->json([
            'message'=>'Música alterada com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }

    public function destroy(Request $request, string $id){ //deletar

        $data = Musica::find($id);

        if(!$data){
            return response()->json([
                'message'=>'Música localizada com sucesso',
                'data'=>$id,
                'status'=>404,
            ],404);
    
        }

        $data->delete();

        return response()->json([
            'message'=>'Música excluída com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }
}
