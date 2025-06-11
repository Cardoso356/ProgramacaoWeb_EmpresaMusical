import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useValidarDadosMusicoInstrumentoUpdate } from "../../rules/MusicoInstrumentoUpdateValidationRules";
import Select from "../../Componentes/input/Select";

export default function MusicoInstrumentoFormUpdate(){

    const navigate = useNavigate();

    const {
        model, 
        error,
        setModel, 
        formValid, 
        handleChangeField, 
        handleBlurField
        
    } = useValidarDadosMusicoInstrumentoUpdate();

    const [musicos, setMusicos] = useState([]);
    const [instrumentos, setInstrumentos] = useState([]);

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

    // Carrega os instrumentos ao montar o componente
    useEffect(() => {
        axiosClient.get('/instrumento/index')
            .then(({ data }) => {
                setInstrumentos(data.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar instrumentos:", error);
            });
    }, []);


    useEffect(()=>{
        if (id){
            axiosClient.get(`/musicoinstrumento/show/${id}`)
            .then(({data})=>{
                const musicoinstrumento = data.data;
                setModel({
                    id: musicoinstrumento.id || "",
                    musicoId: musicoinstrumento.musicoId?.toString() || "",
                    instrumentoId: musicoinstrumento.instrumentoId?.toString() || "",
                })
            }).catch((error)=>{
                console.log("Erro ao carregar relação de músico-instrumento",error);
            });
        }
    },[id]);


    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        if(formValid()){
        const updatedModel = {...model };
        axiosClient.put(`/musicoinstrumento/update/${id}`, updatedModel) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setModel({});
                console.log("Relação de Músico - Instrumento alterada com sucesso");
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
                    {model.id && <h1>Alteração de Músico - Instrumento</h1>}

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
                                { value: "", label: "Selecione o Músico que está ligado ao instrumento" },
                                ...musicos.map(musico => ({
                                    value: musico.id,
                                    label: `${musico.id} - ${musico.nomeMusico}`
                                }))
                            ]}
                        />                     
                    </div>

                    <div className="p-20">                          
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
                    </div>

                   {/* <input value={musicoinstrumento.musicoId} placeholder="Id do Músico" onChange={e=> setMusicoInstrumento({...musicoinstrumento, musicoId: e.target.value})}/>
                    <input value={musicoinstrumento.musico?.nomeMusico || ""} readOnly/> {/*é apenas para visualização*
                    <input value={musicoinstrumento.instrumentoId} placeholder="Id do Instrumento" onChange={e=> setMusicoInstrumento({...musicoinstrumento, instrumentoId: e.target.value})}/>
                    <input value={musicoinstrumento.instrumento?.nomeInstrumento || ""} readOnly/> é apenas para visualização*/}

                    <button className="btn btn-edit" to="/musicoinstrumento/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/musicoinstrumento/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

