import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, Link } from "react-router-dom";
import { useValidarDadosMusica } from "../../rules/MusicaValidationRules";
import Input from "../../Componentes/input/Input";
import Select from "../../Componentes/input/Select";

export default function MusicaFormStore(){

    const navigate = useNavigate();

    const {
        model, 
        error,
        setModel, 
        formValid, 
        handleChangeField, 
        handleBlurField
    
    } = useValidarDadosMusica("create");

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
        if(formValid()){
        axiosClient.post(`/musica/store`, model) // o axios que faz o acesso ao banco de dados
            .then(()=>{
            setModel({});
               /* setMusica({
                    id: null,
                    nomeMusica: "",
                    genero: "",
                    gravadora: "",
                    albumId: "",
                });*/
                console.log('Música incluída com sucesso');
                navigate('/musica/index');
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    
    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    <h1>Inclusão da Música</h1>
                    
                <form onSubmit={(e)=>onSubmit(e)}>

                     <div className="p-20"> 
                    <Input
                        id="nomeMusica"
                        type="text"
                        value={model.nomeMusica}
                        placeholder="Título da Música"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.nomeMusica}
                        mensagem={error.nomeMusicaMensagem}
                    />             
                    </div>

                    <div className="p-20">
                    <Input 
                        id="genero"
                        type="text"
                        value={model.genero}
                        placeholder="Gênero da Música"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.genero}
                        mensagem={error.generoMensagem}
                    />
                    </div>

                    <div className="p-20">          
                    <Input 
                        id="gravadora"
                        type="text"
                        value={model.gravadora}
                        placeholder="Gravadora da Música"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.gravadora}
                        mensagem={error.gravadoraMensagem}
                    />
                    </div>

                   {/* <input type="text" value={musica.nomeMusica} placeholder="Nome da Música" onChange={e=> setMusica({...musica, nomeMusica: e.target.value})}/>
                    <input type="text" value={musica.genero} placeholder="Gênero da Música" onChange={e=> setMusica({...musica, genero: e.target.value})}/>
                    <input type="text" value={musica.gravadora} placeholder="Gravadora da Música" onChange={e=> setMusica({...musica, gravadora: e.target.value})}/>
                    <input type="text" value={musica.albumId} placeholder="Id do Álbum da Música" onChange={e=> setMusica({...musica, albumId: e.target.value})}/> */}

                    {/* SELECT dos Álbuns */}

                        <div className="p-20">
                            {albuns.length === 0 ? (
                                <p style={{ color: "red" }}>
                                    Nenhum álbum encontrado. Cadastre um álbum antes de adicionar músicas.
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
                                        { value: "", label: "Selecione o Álbum da Música" },
                                        ...albuns.map(album => ({
                                            value: album.id,
                                            label: `${album.id} - ${album.tituloAlbum}`
                                        }))
                                    ]}
                                />
                            )}
                        </div>

                    {/*<div className="p-20">
                        {albuns.length === 0 ? (
                            <p style={{ color: "red" }}>
                            Nenhum álbum encontrado. Cadastre um álbum antes de adicionar músicas.
                            </p>
                        ) : (
                            <div>
                            <label htmlFor="albumId">Álbum</label>
                            <select
                                id="albumId"
                                value={model.albumId}
                                onChange={handleChangeField}
                                onBlur={handleBlurField}
                                className={error.albumId ? "input-error" : ""}
                            >
                                <option value="">Selecione um Álbum</option>
                                {albuns.map(album => (
                                <option key={album.id} value={album.id}>
                                    {album.id} - {album.tituloAlbum}
                                </option>
                                ))}
                            </select>
                            {error.albumId && <span className="error-message">{error.albumIdMensagem}</span>}
                            </div>
                        )}
                        </div> */}

                    {/*<div className="p-20">
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
                    </div>*/}

                    <button className="btn btn-add" to="/musica/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/musica/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

