<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Exceptions\HttpRespondeException;
use App\Models\Album;

class AlbumController extends Controller
{
    public function index(Request $request){

        $page = $request->get('page',1); //se não vier nada começa no 1
        $pageSize = $request->get('pageSize',20); //se não vier nada mostra os registros de 5 em 5
        $dir = $request->get('dir','asc');
        $props = $request->get('props','id');
        $search = $request->get('search','');


        $query = Album::select('id','tituloAlbum','formato','dataAlbum')
                ->whereNull('deleted_at')
                ->orderBy($props, $dir);

        $total = $query->count(); //isso guarda o total de registros que tem na tabela

        $data = $query->offset(($page - 1) * $pageSize) //esse é o cálculo da paginação (paginate)
                      ->limit($pageSize)
                      ->get();


        $totalPages = ceil($total / $pageSize); //esse é o total de páginas



        return response()->json([ //json é de javascript
            'message'=>'Relatório de álbuns',
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
            'tituloAlbum'=>'required|string|max:255', //max é tamanho máximo
            'formato'=>'required|string|max:255',
            'dataAlbum'=>'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do álbum',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }


        $data = Album::create([
            'tituloAlbum'=>$request->tituloAlbum,
            'formato'=>$request->formato,
            'dataAlbum'=>$request->dataAlbum,
        ]);

        return response()->json([
            'message'=>'Álbum cadastrado com sucesso',
            'data'=>$data,
            'status'=>201,
        ],201);

    }

    public function show(Request $request, string $id){

        
        try{ //o try catch é um tratamento de exceções (erros)

            $data = Album::findOrFail($id);

            if(!$data){
                throw new HttpResponseException(
                    response()->json('Álbum não localizado'),
                    404,
                );
            }
        } catch(HttpResponseException $e){
            response()->json($e->getMessage());
         }
        
        return response()->json([
            'message'=>'Álbum localizado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }

    public function update(Request $request, string $id){ //atualizar um registro


        $validator = Validator::make($request->all(),[ //valida os dados
            'tituloAlbum'=>'required|string|max:255', //max é tamanho máximo
            'formato'=>'required|string|max:255',
            'dataAlbum'=>'required|string|max:255',
        ]);

        if($validator->fails()){
            return response()->json([
                'message'=>'Erro nas informações do álbum',
                'data'=>$validator->errors(),
                'status'=>404,

            ],404);
        }

        $data = Album::find($id); //achei o usuário

        if(!$data){
            return response()->json([
                'message'=>'Álbum não localizado',
                'data'=>$id,
                'status'=>404,
            ], 404);
        }

        $data->tituloAlbum = $request->tituloAlbum ?? $data->tituloAlbum;
        $data->formato = $request->formato ?? $data->formato;
        $data->dataAlbum = $request->dataAlbum ?? $data->dataAlbum;

        /*if($request->has('senha')){ //a senha veio ?
            $data->senha = Hash::make($request->senha);
        }*/
        
        $data->save();

        return response()->json([
            'message'=>'Álbum alterado com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);
    }

    public function destroy(Request $request, string $id){ //deletar

        $data = Album::find($id);

        if(!$data){
            return response()->json([
                'message'=>'ÁLbum localizado com sucesso',
                'data'=>$id,
                'status'=>404,
            ],404);
    
        }

        $data->delete();

        return response()->json([
            'message'=>'ÁLbum excluído com sucesso',
            'data'=>$data,
            'status'=>200,
        ],200);

    }
}
