import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, Link } from "react-router-dom";

export default function MusicoAlbumFormStore(){

    const navigate = useNavigate();

    const [musicoalbum, setMusicoAlbum] = useState({
        id: null,
        musicoId:"",
        albumId:"",
    });

    const [musicos, setMusicos] = useState([]);
        // Carrega os músicos ao montar o componente
            useEffect(() => {
                axiosClient.get('/musico/index') // Ajuste o endpoint se necessário
                    .then(({ data }) => {
                        setMusicos(data.data);
                    })
                    .catch((error) => {
                        console.error("Erro ao buscar músicos:", error);
                    });
            }, []);
    
        const [albums, setAlbums] = useState([]);
        // Carrega os instrumentos ao montar o componente
        useEffect(() => {
            axiosClient.get('/album/index') // Ajuste o endpoint se necessário
                .then(({ data }) => {
                    setAlbums(data.data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar álbuns:", error);
                });
        }, []);

    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        axiosClient.post(`/musicoalbum/store`, musicoalbum) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setMusicoAlbum({});
                console.log('Relação de Músico - Álbum incluída com sucesso');
                navigate('/musicoalbum/index');
            }).catch((error)=>{
                console.log(error);
            });
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    <h1>Inclusão de Relacionamento Músico-Álbum</h1>
                    
                

                <form onSubmit={(e)=>onSubmit(e)}>
                   {/*} <input type="text" value={musicoalbum.musicoId} placeholder="Id do Músico" onChange={e=> setMusicoAlbum({...musicoalbum, musicoId: e.target.value})}/>
                    <input type="text" value={musicoalbum.albumId} placeholder="Id do Álbum" onChange={e=> setMusicoAlbum({...musicoalbum, albumId: e.target.value})}/> */}

                    <select
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
                </select>

                    <button className="btn btn-add" to="/musicoalbum/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/musicoalbum/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

