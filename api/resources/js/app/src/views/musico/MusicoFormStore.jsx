import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, Link } from "react-router-dom";
import { useValidarDadosMusico } from "../../rules/MusicoValidationRules";
import Input from "../../Componentes/input/Input";

export default function MusicoFormStore(){

    const navigate = useNavigate();

    const {
        model, 
        error,
        setModel, 
        formValid, 
        handleChangeField, 
        handleBlurField
    
    } = useValidarDadosMusico("create");


    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        if(formValid()){
        axiosClient.post(`/musico/store`, model) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setModel({});
                console.log('Músico incluído com sucesso');
                navigate('/musico/index');
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    <h1>Inclusão do Músico</h1>

                <form onSubmit={(e)=>onSubmit(e)}>

                    <div className="p-20"> 
                    <Input
                        id="nomeMusico"
                        type="text"
                        value={model.nomeMusico}
                        placeholder="Nome do Músico"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.nomeMusico}
                        mensagem={error.nomeMusicoMensagem}
                    />             
                    </div>

                    <div className="p-20">
                    <Input 
                        id="idade"
                        type="text"
                        value={model.idade}
                        placeholder="Idade do Músico"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.idade}
                        mensagem={error.idadeMensagem}
                    />
                    </div>

                    <div className="p-20">          
                    <Input 
                        id="cpf"
                        type="text"
                        value={model.cpf}
                        placeholder="CPF do músico"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.cpf}
                        mensagem={error.cpfMensagem}
                    />
                    </div>

                    <div className="p-20"> 
                    <Input
                        id="telefone"
                        type="text"
                        value={model.telefone}
                        placeholder="Telefone do Músico"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.telefone}
                        mensagem={error.telefoneMensagem}
                    />             
                    </div>

                    <div className="p-20">
                    <Input 
                        id="endereco"
                        type="text"
                        value={model.endereco}
                        placeholder="Endereço do Músico"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.endereco}
                        mensagem={error.enderecoMensagem}
                    />
                    </div>

                    <div className="p-20">          
                    <Input 
                        id="cidade"
                        type="text"
                        value={model.cidade}
                        placeholder="Cidade do Músico"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.cidade}
                        mensagem={error.cidadeMensagem}
                    />
                    </div>

                   {/* <input type="text" value={musico.nomeMusico} placeholder="Nome do Músico" onChange={e=> setMusico({...musico, nomeMusico: e.target.value})}/>
                    <input type="text" value={musico.idade} placeholder="Idade do Músico" onChange={e=> setMusico({...musico, idade: e.target.value})}/>
                    <input type="text" value={musico.cpf} placeholder="CPF do Músico" onChange={e=> setMusico({...musico, cpf: e.target.value})}/>
                    <input type="text" value={musico.telefone} placeholder="Telefone do Músico" onChange={e=> setMusico({...musico, telefone: e.target.value})}/>
                    <input type="text" value={musico.endereco} placeholder="Endereço do Músico" onChange={e=> setMusico({...musico, endereco: e.target.value})}/>
                    <input type="text" value={musico.cidade} placeholder="Cidade do Músico" onChange={e=> setMusico({...musico, cidade: e.target.value})}/> */}

                    <button className="btn btn-add" to="/musico/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/musico/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

