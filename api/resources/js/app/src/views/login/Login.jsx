import { createRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../axiosClientjs";
import { useLogin } from "../../context/ContextProvider";
import { useValidarDadosLogin } from "../../rules/LoginValidationRules";
import MensagemErro from "../../Componentes/Mensagens/MensagemErro";

export default function Login(){

    const {
           model, 
           error, 
           formValid, 
           handleChangeField, 
           handleBlurField

    } = useValidarDadosLogin();

    const navigate = useNavigate();

    const { _setToken, _setUser } = useLogin();

    const [message, setMessage] = useState(null);


    const getInputClass = (error) => {

        if(error){
            return "form-control is-invalid";
        } else if (error === false){
            return "form-control is-valid";
        }
        return "form-control";

    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(formValid()){
        console.log(model);


        const login = {
            email: model.email,
            password: model.password,
        }

        axiosClient.post('/login', login)
                    .then(({data})=>{
                        console.log(data);
                        localStorage.setItem('TOKEN', data.token);  // Salva o token no localStorage
                        _setToken(data.token);
                        _setUser(data.user);
                        //setMessage('Login realizado com sucesso'+login);
                        navigate('/dashboard'); //ao fazer o login, se der certo ele abre a página principal do sistema
                    })
                    .catch((erro)=>{
                        console.log(erro);
                    })
        }
       
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
                    <div className="p-20">
                    <input type="text" 
                        placeholder="E-mail" 
                        className={getInputClass(error.email)}
                        name="email"
                        value={model.email}
                        onChange={handleChangeField}
                        onBlur={handleBlurField} //o onBlur é o responsável por:ao clicar no tab, ele pula para o outro campo
                        />
                        {
                            <MensagemErro
                                error = {error.email}
                                mensagem = {error.emailMensagem}
                            />
                        }
                    </div>

                    <div className="p-20">
                    <input type="password" 
                        placeholder="Senha" 
                        className={getInputClass(error.password)}
                        name = "password"
                        value = {model.password}
                        onChange={handleChangeField}
                        onBlur={handleBlurField}
                        />
                        {
                            <MensagemErro
                                error = {error.password}
                                mensagem = {error.passwordMensagem}
                            />
                         }
                    </div>
                    
                    <button type="Submit"
                        className='btn btn-block p-20'>Login</button>
                    <p className='message'>Não está registrado ? <Link to='/register'>Criar nova conta</Link> </p>
                    <p className='message'>Deseja alterar a senha ? <Link to='/forgotpassword'>Alterar senha</Link> </p>
                </form>
            </div>
        </div>
    )

}