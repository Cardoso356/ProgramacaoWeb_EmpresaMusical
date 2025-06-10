import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, Link } from "react-router-dom";
import { useValidarDadosUsuario } from "../../rules/UserValidationRules";
import Input from "../../Componentes/input/Input";

export default function UserFormStore(){

    const navigate = useNavigate();

    const {
        model, 
        error,
        setModel, 
        formValid, 
        handleChangeField, 
        handleBlurField
    
    } = useValidarDadosUsuario("create");

    const onSubmit = (e) => {
        e.preventDefault(); //impede que o navegador recarregue a página
        if(formValid()){
        axiosClient.post(`/user/store`, model) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setModel({});
                console.log('Usuário incluído com sucesso');
                navigate('/user/index');
            }).catch((error)=>{
                console.log(error);
            });
        }
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    <h1>Inclusão do usuário</h1>   

                <form onSubmit={(e)=>onSubmit(e)}>

                    <div className="p-20"> 
                    <Input
                        id="name"
                        type="text"
                        value={model.name}
                        placeholder="Nome"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.name}
                        mensagem={error.nameMensagem}
                    />             
                    </div>

                    <div className="p-20">
                    <Input 
                        id="email"
                        type="text"
                        value={model.email}
                        placeholder="E-mail"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.email}
                        mensagem={error.emailMensagem}
                    />
                    </div>

                    <div className="p-20">          
                    <Input 
                        id="password"
                        type="password"
                        value={model.password}
                        placeholder="Senha"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.password}
                        mensagem={error.passwordMensagem}
                    />
                    </div>

                    {/*<input type="text" value={user.name} placeholder="Nome do Usuário" onChange={e=> setUser({...user, name: e.target.value})}/>
                    <input type="text" value={user.email} placeholder="E-mail do Usuário" onChange={e=> setUser({...user, email: e.target.value})}/>
                    <input type="password" value={user.password} placeholder="Senha do Usuário" onChange={e=> setUser({...user, password: e.target.value})}/> */}

                    <button className="btn btn-add" to="/user/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/user/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

