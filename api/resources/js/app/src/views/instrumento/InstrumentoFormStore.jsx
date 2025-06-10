import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, Link } from "react-router-dom";
import { useValidarDadosInstrumento } from "../../rules/InstrumentoValidationRules";
import Input from "../../Componentes/input/Input";

export default function InstrumentoFormStore(){

    const navigate = useNavigate();

    const {
        model, 
        error,
        setModel, 
        formValid, 
        handleChangeField, 
        handleBlurField
    
    } = useValidarDadosInstrumento("create");


    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        if(formValid()){
        axiosClient.post(`/instrumento/store`, model) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setModel({});
                console.log('Instrumento incluído com sucesso');
                navigate('/instrumento/index');
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    <h1>Inclusão do Instrumento</h1>
                    
                <form onSubmit={(e)=>onSubmit(e)}>

                    <div className="p-20"> 
                    <Input
                        id="nomeInstrumento"
                        type="text"
                        value={model.nomeInstrumento}
                        placeholder="Nome do Instrumento"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.nomeInstrumento}
                        mensagem={error.nomeInstrumentoMensagem}
                    />             
                    </div>

                    <div className="p-20">
                    <Input 
                        id="tipo"
                        type="text"
                        value={model.tipo}
                        placeholder="Tipo do Instrumento"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.tipo}
                        mensagem={error.tipoMensagem}
                    />
                    </div>

                    <div className="p-20">          
                    <Input 
                        id="marca"
                        type="text"
                        value={model.marca}
                        placeholder="Marca do Instrumento"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.marca}
                        mensagem={error.marcaMensagem}
                    />
                    </div>

                    <div className="p-20"> 
                    <Input
                        id="modelo"
                        type="text"
                        value={model.modelo}
                        placeholder="Modelo do Instrumento"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.modelo}
                        mensagem={error.modeloMensagem}
                    />             
                    </div>

                   {/* <input type="text" value={instrumento.nomeInstrumento} placeholder="Nome do Instrumento" onChange={e=> setInstrumento({...instrumento, nomeInstrumento: e.target.value})}/>
                    <input type="text" value={instrumento.tipo} placeholder="Tipo do Instrumento" onChange={e=> setInstrumento({...instrumento, tipo: e.target.value})}/>
                    <input type="text" value={instrumento.marca} placeholder="Marca do Instrumento" onChange={e=> setInstrumento({...instrumento, marca: e.target.value})}/>
                    <input type="text" value={instrumento.modelo} placeholder="Modelo do Instrumento" onChange={e=> setInstrumento({...instrumento, modelo: e.target.value})}/> */}

                    <button className="btn btn-add" to="/instrumento/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/instrumento/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

