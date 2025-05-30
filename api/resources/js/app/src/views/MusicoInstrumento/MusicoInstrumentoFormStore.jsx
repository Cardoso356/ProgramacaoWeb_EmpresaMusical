import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, Link } from "react-router-dom";

export default function MusicoInstrumentoFormStore(){

    const navigate = useNavigate();

    const [musicoinstrumento, setMusicoInstrumento] = useState({
        id: null,
        musicoId:"",
        instrumentoId:"",
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
        axiosClient.post(`/musicoinstrumento/store`, musicoinstrumento) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setMusicoInstrumento({});
                console.log('Relação de Músico - Instrumento incluída com sucesso');
                navigate('/musicoinstrumento/index');
            }).catch((error)=>{
                console.log(error);
            });
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    <h1>Inclusão de Relacionamento Músico-Instrumento</h1>
                    
                

                <form onSubmit={(e)=>onSubmit(e)}>
                    {/*<input type="text" value={musicoinstrumento.musicoId} placeholder="Id do Músico" onChange={e=> setMusicoInstrumento({...musicoinstrumento, musicoId: e.target.value})}/>
                    <input type="text" value={musicoinstrumento.instrumentoId} placeholder="Id do Instrumento" onChange={e=> setMusicoInstrumento({...musicoinstrumento, instrumentoId: e.target.value})}/> */}

                <select
                    value={musicoinstrumento.musicoId}
                    onChange={(e) => setMusicoInstrumento({ ...musicoinstrumento, musicoId: e.target.value })} required
                >
                    <option value="">-- Selecione um músico --</option>
                    {musicos.map((musico) => (
                        <option key={musico.id} value={musico.id}>
                            {musico.id+" - "+musico.nomeMusico}
                        </option>
                    ))}
                </select>

                <select
                    value={musicoinstrumento.instrumentoId}
                    onChange={(e) => setMusicoInstrumento({ ...musicoinstrumento, instrumentoId: e.target.value })}
                    required
                >
                    <option value="">-- Selecione o instrumento tocado pelo músico --</option>
                    {instrumentos.map((instrumento) => (
                        <option key={instrumento.id} value={instrumento.id}>
                            {instrumento.id+" - "+instrumento.nomeInstrumento}
                        </option>
                    ))}
                </select>

                    <button className="btn btn-add" to="/musicoinstrumento/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/musicoinstrumento/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

