import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useValidarDadosMusicaUpdate } from "../../rules/MusicaUpdateValidationRules";
import Input from "../../Componentes/input/Input";
import Select from "../../Componentes/input/Select";

export default function MusicaFormUpdate(){

    const navigate = useNavigate();

    const {
        model, 
        error,
        setModel, 
        formValid, 
        handleChangeField, 
        handleBlurField
        
    } = useValidarDadosMusicaUpdate();

    const [albuns, setAlbuns] = useState([]);

    const {id} = useParams();

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

    useEffect(() => {
        if (id) {
            axiosClient.get(`/musica/show/${id}`)
            .then(({ data }) => {
                const musica = data.data;
                setModel({
                id: musica.id || "",
                nomeMusica: musica.nomeMusica || "",
                genero: musica.genero || "",
                gravadora: musica.gravadora || "",
                albumId: musica.albumId?.toString() || "",  // certifique-se de que é string
                });
            })
            .catch((error) => {
                console.log("Erro ao carregar música:", error);
            });
        }
    }, [id]);


    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        if(formValid()){
        const updatedModel = {...model };
        axiosClient.put(`/musica/update/${id}`, updatedModel) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setModel({});
                console.log("Música alterada com sucesso");
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
                    {model.id && <h1>Alteração dos Dados da Música</h1>}

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

                    <div className="p-20">                          
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
                    </div>

                    {/*<input value={musica.nomeMusica} placeholder="Nome da Música" onChange={e=> setMusica({...musica, nomeMusica: e.target.value})}/>
                    <input value={musica.genero} placeholder="Gênero da Música" onChange={e=> setMusica({...musica, genero: e.target.value})}/>
                    <input value={musica.gravadora} placeholder="Gravadora da Música" onChange={e=> setMusica({...musica, gravadora: e.target.value})}/>
                    <input value={musica.albumId} placeholder="Id do Álbum da Música" onChange={e=> setMusica({...musica, albumId: e.target.value})}/>
                    <input value={musica.album?.tituloAlbum || ""} readOnly/> {/*é apenas para visualização */}

                    <button className="btn btn-edit" to="/musica/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/musica/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

