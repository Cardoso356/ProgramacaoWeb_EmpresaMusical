import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function UserFormUpdate(){

    const navigate = useNavigate();

    const [user, setUser] = useState({
        id:null,
        name:"",
        email:"",
    });


    const {id} = useParams();

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
        axiosClient.put(`/user/update/${id}`, user) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setUser({});
                console.log("Usuário alterado com sucesso");
                navigate('/user/index');
            }).catch((error)=>{
                console.log(error);
            });
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    {user.id && <h1>Alteração do usuário</h1>}

                <form onSubmit={(e)=>onSubmit(e)}>
                    <input value={user.name} placeholder="Nome do Usuário" onChange={e=> setUser({...user, name: e.target.value})}/>
                    <input value={user.email} placeholder="E-mail do Usuário" onChange={e=> setUser({...user, email: e.target.value})}/>

                    <button className="btn btn-edit" to="/user/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/user/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

