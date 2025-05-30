import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, Link } from "react-router-dom";

export default function MusicaFormStore(){

    const navigate = useNavigate();

    const [musica, setMusica] = useState({
        id: null,
        nomeMusica:"",
        genero:"",
        gravadora:"",
        albumId:"",
    });

    const [albuns, setAlbuns] = useState([]);

    // Carrega os álbuns ao montar o componente
    useEffect(() => {
        axiosClient.get('/album/index') // Ajuste o endpoint se necessário
            .then(({ data }) => {
                setAlbuns(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar álbuns:", error);
            });
    }, []);

    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        axiosClient.post(`/musica/store`, musica) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setMusica({
                    id: null,
                    nomeMusica: "",
                    genero: "",
                    gravadora: "",
                    albumId: "",
                });
                console.log('Música incluída com sucesso');
                navigate('/musica/index');
            }).catch((error)=>{
                console.log(error);
            });
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    <h1>Inclusão da música</h1>
                    
                

                <form onSubmit={(e)=>onSubmit(e)}>
                    <input type="text" value={musica.nomeMusica} placeholder="Nome da Música" onChange={e=> setMusica({...musica, nomeMusica: e.target.value})}/>
                    <input type="text" value={musica.genero} placeholder="Gênero da Música" onChange={e=> setMusica({...musica, genero: e.target.value})}/>
                    <input type="text" value={musica.gravadora} placeholder="Gravadora da Música" onChange={e=> setMusica({...musica, gravadora: e.target.value})}/>
                    {/*<input type="text" value={musica.albumId} placeholder="Id do Álbum da Música" onChange={e=> setMusica({...musica, albumId: e.target.value})}/> */}

                    {/* SELECT dos Álbuns */}
                    {albuns.length === 0 ? (
                    <p style={{ color: "red" }}>
                        Nenhum álbum encontrado. Cadastre um álbum antes de adicionar músicas.
                    </p>
                    ) : (
                        <select value={musica.albumId} onChange={e => setMusica({ ...musica, albumId: e.target.value })} required>
                            <option value="">Selecione um Álbum</option>
                            {albuns.map(album => (
                                <option key={album.id} value={album.id}>
                                    {album.id+" - "+album.tituloAlbum}
                                </option>
                            ))}
                        </select>
                    )}

                    <button className="btn btn-add" to="/musica/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/musica/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

