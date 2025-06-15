import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, Link } from "react-router-dom";
import { useValidarDadosMusicoInstrumento } from "../../rules/MusicoInstrumentoValidationRules";
import Select from "../../Componentes/input/Select";

export default function MusicoInstrumentoFormStore(){

    const navigate = useNavigate();

    const {
        model, 
        error,
        setModel, 
        formValid, 
        handleChangeField, 
        handleBlurField
    
    } = useValidarDadosMusicoInstrumento("create");

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


    const [instrumentos, setInstrumentos] = useState([]);

    // Carrega os instrumentos ao montar o componente
    useEffect(() => {
        axiosClient.get('/instrumento/index') // Ajuste o endpoint se necessário
            .then(({ data }) => {
                setInstrumentos(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar instrumentos:", error);
            });
    }, []);

    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        if(formValid()){
        axiosClient.post(`/musicoinstrumento/store`, model) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setModel({});
                console.log('Relação de Músico - Instrumento incluída com sucesso');
                navigate('/musicoinstrumento/index');
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    <h1 className="p-20">Inclusão de Relacionamento Músico-Instrumento</h1>
                    
                

                <form onSubmit={(e)=>onSubmit(e)}>
                    {/*<input type="text" value={musicoinstrumento.musicoId} placeholder="Id do Músico" onChange={e=> setMusicoInstrumento({...musicoinstrumento, musicoId: e.target.value})}/>
                    <input type="text" value={musicoinstrumento.instrumentoId} placeholder="Id do Instrumento" onChange={e=> setMusicoInstrumento({...musicoinstrumento, instrumentoId: e.target.value})}/> */}

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
                                        { value: "", label: "Selecione o Músico que está ligado ao instrumento" },
                                        ...musicos.map(musico => ({
                                            value: musico.id,
                                            label: `${musico.id} - ${musico.nomeMusico}`
                                        }))
                                    ]}
                                />
                            )}
                        </div>


                    <div className="p-20">
                            {instrumentos.length === 0 ? (
                                <p style={{ color: "red" }}>
                                    Nenhum instrumento encontrado. Cadastre um instrumento antes de adicionar instrumentos para o relacionamento.
                                </p>
                            ) : (
                                <Select
                                    id="instrumentoId"
                                    value={model.instrumentoId}
                                    handleChangeField={handleChangeField}
                                    handleBlurField={handleBlurField}
                                    error={error.instrumentoId}
                                    mensagem={error.instrumentoIdMensagem}
                                    options={[
                                        { value: "", label: "Selecione o Instrumento que está ligado ao músico" },
                                        ...instrumentos.map(instrumento => ({
                                            value: instrumento.id,
                                            label: `${instrumento.id} - ${instrumento.nomeInstrumento}`
                                        }))
                                    ]}
                                />
                            )}
                        </div>

                    <button className="btn btn-add" to="/musicoinstrumento/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/musicoinstrumento/index">Cancelar</Link>                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

