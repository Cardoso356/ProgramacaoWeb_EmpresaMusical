import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useValidarDadosUpdateUsuario } from "../../rules/UserUpdateValidationRules";
import Input from "../../Componentes/input/Input";

export default function UserFormUpdate(){

    const navigate = useNavigate();

    const {
        model, 
        error,
        setModel, 
        formValid, 
        handleChangeField, 
        handleBlurField
        
    } = useValidarDadosUpdateUsuario();


    const {id} = useParams();

    useEffect(()=>{
        if (id){
                axiosClient.get(`/user/show/${id}`)
                .then(({data})=>{
                    setModel(data.data);
                }).catch((error)=>{
                    console.log(error);
                });
        }
    },[id]);


    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        
        if(formValid()){  
            const updatedModel = {...model };

            if (!updatedModel.password) {
                delete updatedModel.password;
            }
        
        axiosClient.put(`/user/update/${id}`, updatedModel) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setModel({});
                console.log("Usuário alterado com sucesso");
                navigate('/user/index');
            }).catch((error)=>{
                console.log(error);
            });
        }
        else{
            console.log("Não foi possível alterar o usuário");
        }
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    {model.id && <h1>Alteração do usuário</h1>}

                <form onSubmit={(e)=>onSubmit(e)}>

                    <div className="p-20">             
                    <Input
                        id="name"
                        type="text"
                        value={model.name}
                        placeholder="Nome do Usuário"
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
                        placeholder="E-mail do Usuário"
                        handleChangeField={handleChangeField}
                        handleBlurField={handleBlurField}
                        error={error.email}
                        mensagem={error.emailMensagem}
                    />
                    </div>

                    {/*<input value={user.name} placeholder="Nome do Usuário" onChange={e=> setUser({...user, name: e.target.value})}/>
                    <input value={user.email} placeholder="E-mail do Usuário" onChange={e=> setUser({...user, email: e.target.value})}/> */}

                    <button className="btn btn-edit" to="/user/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/user/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

