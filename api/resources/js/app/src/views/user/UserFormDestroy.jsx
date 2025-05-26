import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function UserFormDestroy(){

    const navigate = useNavigate();

    const [user, setUser] = useState({
        id: null,
        name:"",
        email:"",
    });


    const { id } = useParams();

    useEffect(()=>{
        if (id){
            
                axiosClient.get(`/user/show/${id}`)
                .then(({data})=>{
                    setUser(data.data);
                }).catch((error)=>{
                    console.log(error);
                });
        }
    },[id]);


    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        axiosClient.delete(`/user/destroy/${id}`) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setUser({});
                console.log('Usuário excluído com sucesso');
                navigate('/user/index');
            }).catch((error)=>{
                console.log(error);
            });
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    {user.id && <h1>Exclusão de usuário:{user.name}</h1>}
                    
                

                <form onSubmit={(e)=>onSubmit(e)}>
                    <input defaultValue={user.name} placeholder="Nome do Usuário" readOnly={true}/>
                    <input defaultValue={user.email} placeholder="E-mail do Usuário" readOnly={true}/>

                    <button className="btn btn-delete">Excluir</button>
                    <Link type="button" className="btn btn-cancel" to="/user/index">Cancelar</Link>
                    

                </form>

                </div>

            </div>


        </Fragment>
    )
}