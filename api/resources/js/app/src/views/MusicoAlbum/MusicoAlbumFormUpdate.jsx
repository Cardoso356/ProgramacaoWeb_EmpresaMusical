import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useValidarDadosMusicoAlbumUpdate } from "../../rules/MusicoAlbumUpdateValidationRules";
import Select from "../../Componentes/input/Select";

export default function MusicoAlbumFormUpdate(){

    const navigate = useNavigate();

    const {
        model, 
        error,
        setModel, 
        formValid, 
        handleChangeField, 
        handleBlurField
        
    } = useValidarDadosMusicoAlbumUpdate();

    const [musicos, setMusicos] = useState([]);
    const [albums, setAlbums] = useState([]);

    const {id} = useParams();

    // Carrega os músicos ao montar o componente
    useEffect(() => {
        axiosClient.get('/musico/index')
            .then(({ data }) => {
                setMusicos(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar músicos:", error);
            });
    }, []);
    
    // Carrega os álbuns ao montar o componente
    useEffect(() => {
        axiosClient.get('/album/index')
            .then(({ data }) => {
                setAlbums(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar álbuns:", error);
            });
    }, []);

    useEffect(()=>{
        if (id){
            axiosClient.get(`/musicoalbum/show/${id}`)
            .then(({data})=>{
                const musicoalbum = data.data;
                setModel({
                    id: musicoalbum.id || "",
                    musicoId: musicoalbum.musicoId?.toString() || "",
                    albumId: musicoalbum.albumId?.toString() || "",
                });
            }).catch((error)=>{
                console.log("Erro ao carregar relação de músico-instrumento",error);
            });
        }
    },[id]);


    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        if(formValid()){
        const updatedModel = {...model };
        axiosClient.put(`/musicoalbum/update/${id}`, updatedModel) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setModel({});
                console.log("Relação de Músico - Álbum alterada com sucesso");
                navigate('/musicoalbum/index');
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    {model.id && <h1>Alteração de Músico - Álbum</h1>}

                <form onSubmit={(e)=>onSubmit(e)}>

                     <div className="p-20">                          
                        <Select
                            id="musicoId"
                            value={model.musicoId}
                            handleChangeField={handleChangeField}
                            handleBlurField={handleBlurField}
                            error={error.musicoId}
                            mensagem={error.musicoIdMensagem}
                            options={[
                                { value: "", label: "Selecione o Músico que está ligado ao Álbum" },
                                ...musicos.map(musico => ({
                                    value: musico.id,
                                    label: `${musico.id} - ${musico.nomeMusico}`
                                }))
                            ]}
                        />                     
                    </div>

                    <div className="p-20">                          
                        <Select
                            id="albumId"
                            value={model.albumId}
                            handleChangeField={handleChangeField}
                            handleBlurField={handleBlurField}
                            error={error.albumId}
                            mensagem={error.albumIdMensagem}
                            options={[
                                { value: "", label: "Selecione o Instrumento que está ligado ao Álbum" },
                                ...albums.map(album => ({
                                    value: album.id,
                                    label: `${album.id} - ${album.tituloAlbum}`
                                }))
                            ]}
                        />                     
                    </div>

                   {/* <input value={musicoalbum.musicoId} placeholder="Id do Músico" onChange={e=> setMusicoAlbum({...musicoalbum, musicoId: e.target.value})}/>
                    <input value={musicoalbum.musico?.nomeMusico || ""} readOnly/> é apenas para visualização
                    <input value={musicoalbum.albumId} placeholder="Id do Álbum" onChange={e=> setMusicoAlbum({...musicoalbum, albumId: e.target.value})}/>
                    <input value={musicoalbum.album?.tituloAlbum || ""} readOnly/> *é apenas para visualização*/}

                    <button className="btn btn-edit" to="/musicoalbum/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/musicoalbum/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

