import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useValidarDadosAlbumUpdate } from "../../rules/AlbumUpdateValidationRules";
import Input from "../../Componentes/input/Input";

export default function AlbumFormUpdate(){

    const navigate = useNavigate();

    const {
        model, 
        error,
        setModel, 
        formValid, 
        handleChangeField, 
        handleBlurField
        
    } = useValidarDadosAlbumUpdate();


    const {id} = useParams();

    useEffect(()=>{
        if (id){
                axiosClient.get(`/album/show/${id}`)
                .then(({data})=>{
                    setModel(data.data);
                }).catch((error)=>{
                    console.log(error);
                });
        }
    },[id]);


    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página

        if(formValid()){
        const updatedModel = {...model};
        axiosClient.put(`/album/update/${id}`, updatedModel) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setModel({});
                console.log("Álbum alterado com sucesso");
                navigate('/album/index');
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    {model.id && <h1>Alteração do Álbum</h1>}

                <form onSubmit={(e)=>onSubmit(e)}>

                    <div className="p-20"> 
                    <Input
                        id="tituloAlbum"
                        type="text"
                        value={model.tituloAlbum}
                        placeholder="Título do Álbum"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.tituloAlbum}
                        mensagem={error.tituloAlbumMensagem}
                    />             
                    </div>

                    <div className="p-20">
                    <Input 
                        id="formato"
                        type="text"
                        value={model.formato}
                        placeholder="Formato do Álbum"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.formato}
                        mensagem={error.formatoMensagem}
                    />
                    </div>

                    <div className="p-20">          
                    <Input 
                        id="dataAlbum"
                        type="text"
                        value={model.dataAlbum}
                        placeholder="Data de lançamento do Álbum"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.dataAlbum}
                        mensagem={error.dataAlbumMensagem}
                    />
                    </div>

                   {/* <input value={album.tituloAlbum} placeholder="Título do Álbum" onChange={e=> setAlbum({...album, tituloAlbum: e.target.value})}/>
                    <input value={album.formato} placeholder="Formato do Álbum" onChange={e=> setAlbum({...album, formato: e.target.value})}/>
                    <input value={album.dataAlbum} placeholder="Data do Álbum" onChange={e=> setAlbum({...album, dataAlbum: e.target.value})}/> */}

                    <button className="btn btn-edit" to="/album/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/album/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

