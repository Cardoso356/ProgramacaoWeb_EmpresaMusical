import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, Link } from "react-router-dom";
import { useValidarDadosMusicoAlbum } from "../../rules/MusicoAlbumValidationRules";
import Select from "../../Componentes/input/Select";

export default function MusicoAlbumFormStore(){

    const navigate = useNavigate();

     const {
         model, 
         error,
         setModel, 
         formValid, 
         handleChangeField, 
         handleBlurField
     
     } = useValidarDadosMusicoAlbum("create");

    const [musicos, setMusicos] = useState([]);

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
    
        const [albums, setAlbums] = useState([]);

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

    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        if(formValid()){
        axiosClient.post(`/musicoalbum/store`, model) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setModel({});
                console.log('Relação de Músico - Álbum incluída com sucesso');
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
                    <h1 className="p-20">Inclusão de Relacionamento Músico-Álbum</h1>
                    
                

                <form onSubmit={(e)=>onSubmit(e)}>
                   {/*} <input type="text" value={musicoalbum.musicoId} placeholder="Id do Músico" onChange={e=> setMusicoAlbum({...musicoalbum, musicoId: e.target.value})}/>
                    <input type="text" value={musicoalbum.albumId} placeholder="Id do Álbum" onChange={e=> setMusicoAlbum({...musicoalbum, albumId: e.target.value})}/> */}

                    <div className="p-20">
                            {musicos.length === 0 ? (
                                <p style={{ color: "red" }}>
                                    Nenhum músico encontrado. Cadastre um músico antes de adicionar músicos para o relacionamento.
                                </p>
                            ) : (
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
                            )}
                        </div>


                    <div className="p-20">
                            {albums.length === 0 ? (
                                <p style={{ color: "red" }}>
                                    Nenhum álbum encontrado. Cadastre um álbum antes de adicionar álbuns para o relacionamento.
                                </p>
                            ) : (
                                <Select
                                    id="albumId"
                                    value={model.albumId}
                                    handleChangeField={handleChangeField}
                                    handleBlurField={handleBlurField}
                                    error={error.albumId}
                                    mensagem={error.albumIdMensagem}
                                    options={[
                                        { value: "", label: "Selecione o Álbum que está ligado ao Músico" },
                                        ...albums.map(album => ({
                                            value: album.id,
                                            label: `${album.id} - ${album.tituloAlbum}`
                                        }))
                                    ]}
                                />
                            )}
                        </div>

                  {/*}  <select
                    value={musicoalbum.musicoId}
                    onChange={(e) => setMusicoAlbum({ ...musicoalbum, musicoId: e.target.value })} required
                >
                    <option value="">-- Selecione o músico --</option>
                    {musicos.map((musico) => (
                        <option key={musico.id} value={musico.id}>
                            {musico.id+" - "+musico.nomeMusico}
                        </option>
                    ))}
                </select>

                <select
                    value={musicoalbum.albumId}
                    onChange={(e) => setMusicoAlbum({ ...musicoalbum, albumId: e.target.value })} required
                >
                    <option value="">-- Selecione o álbum relacionado ao músico --</option>
                    {albums.map((album) => (
                        <option key={album.id} value={album.id}>
                            {album.id+" - "+album.tituloAlbum}
                        </option>
                    ))}
                </select> */}

                    <button className="btn btn-add" to="/musicoalbum/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/musicoalbum/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

