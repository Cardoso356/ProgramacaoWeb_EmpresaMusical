import {Fragment, useEffect, useState } from "react";
import axiosClient from "../../axiosClientjs";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function MusicoFormUpdate(){

    const navigate = useNavigate();

    const [musico, setMusico] = useState({
        id:null,
        nomeMusico:"",
        idade:"",
        endereco:"",
        telefone:"",
        //cpf:"",
        cidade:"",
    });


    const {id} = useParams();

    useEffect(()=>{
        if (id){
                axiosClient.get(`/musico/show/${id}`)
                .then(({data})=>{
                    setMusico(data.data);
                }).catch((error)=>{
                    console.log(error);
                });
        }
    },[id]);


    const onSubmit = (e) => {

        e.preventDefault(); //impede que o navegador recarregue a página
        axiosClient.put(`/musico/update/${id}`, musico) // o axios que faz o acesso ao banco de dados
            .then(()=>{
                setMusico({});
                console.log("Músico alterado com sucesso");
                navigate('/musico/index');
            }).catch((error)=>{
                console.log(error);
            });
    }

    


    return(
        <Fragment>

            <div className="display">

                <div className="card animated fadeinDown">
                    {musico.id && <h1>Alteração do Músico</h1>}

                <form onSubmit={(e)=>onSubmit(e)}>
                    <input value={musico.nomeMusico} placeholder="Nome do Músico" onChange={e=> setMusico({...musico, nomeMusico: e.target.value})}/>
                    <input value={musico.idade} placeholder="Idade do Músico" onChange={e=> setMusico({...musico, idade: e.target.value})}/>
                    <input value={musico.telefone} placeholder="Telefone do Músico" onChange={e=> setMusico({...musico, telefone: e.target.value})}/>
                    <input value={musico.endereco} placeholder="Endereço do Músico" onChange={e=> setMusico({...musico, endereco: e.target.value})}/>
                    <input value={musico.cidade} placeholder="Cidade do Músico" onChange={e=> setMusico({...musico, cidade: e.target.value})}/>

                    <button className="btn btn-edit" to="/musico/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/musico/index">Cancelar</Link>
                    

                </form>
                
                </div>

            </div>


        </Fragment>
    )
}

