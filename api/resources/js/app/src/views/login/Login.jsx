import { createRef, useState } from "react"
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClientjs";

export default function Login(){

    const emailRef = createRef();
    const passwordRef = createRef();

    const [message, setMessage] = useState(null);

    const onSubmit = (e) => {
        e.preventDefault();

        const login = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('/login', login)
                    .then(({data})=>{
                        console.log(data);
                    })
                    .catch((erro)=>{
                        console.log(erro);
                    })

        setMessage('Login realizado com sucesso');
    }

    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title p-20">Acesso ao Sistema</h1>
                    {
                        message &&
                        <div className="alert">
                            <p>{message}</p>
                        </div>
                    }

                    <input type="text" 
                        placeholder="E-mail" 
                        className="p-20"
                        ref={emailRef}/>
                    <input type="password" 
                        placeholder="Senha" 
                        className="p-20"
                        ref = {passwordRef}/>
                    <button type="submit"
                        className='btn btn-block p-20'>Login</button>
                    <p className='message'>Não está Registrado</p><Link to='/register'>Criar nova conta</Link>
                </form>
            </div>
        </div>
    )

}