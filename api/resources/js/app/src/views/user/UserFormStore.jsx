import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, Link } from "react-router-dom";

export default function UserFormStore(){

    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: null,
        name:"",
        email:"",
        password:"",
    });


    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        axiosClient.post(`/user/store`, user) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setUser({});
                console.log('Usuário incluído com sucesso');
                navigate('/user/index');
            }).catch((error)=>{
                console.log(error);
            });
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    <h1>Inclusão do usuário</h1>
                    
                

                <form onSubmit={(e)=>onSubmit(e)}>
                    <input type="text" value={user.name} placeholder="Nome do Usuário" onChange={e=> setUser({...user, name: e.target.value})}/>
                    <input type="text" value={user.email} placeholder="E-mail do Usuário" onChange={e=> setUser({...user, email: e.target.value})}/>
                    <input type="password" value={user.password} placeholder="Senha do Usuário" onChange={e=> setUser({...user, password: e.target.value})}/>

                    <button className="btn btn-add" to="/user/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/user/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

