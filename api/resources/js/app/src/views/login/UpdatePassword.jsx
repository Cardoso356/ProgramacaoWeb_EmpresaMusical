import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"
import axiosClient from "../../axiosClientjs";
import { useValidarDadosUpdatePassword } from "../../rules/UpdatePasswordValidationRules";
import MensagemErro from "../../Componentes/Mensagens/MensagemErro";

export default function UpdatePassword(){
    
const {
    model, 
    error, 
    formValid, 
    handleChangeField, 
    handleBlurField,

} = useValidarDadosUpdatePassword();

    const navigate = useNavigate();
    const location = useLocation();

    const [message, setMessage] = useState(null);
    const [token, setToken] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        setToken(query.get("token") || "");
        setEmail(query.get("email") || "");
    }, [location.search]);

    const getInputClass = (error) => {

        if(error){
            return "form-control is-invalid";
        } else if (error === false){
            return "form-control is-valid";
        }
        return "form-control";

    }

    const onSubmit = async(e) => {
            e.preventDefault();
            formValid();
            console.log(error);
    
            try {
                await axiosClient.post("/updatePassword", {
                    token,
                    email,
                    password: model.password,
                    password_confirmation: model.confirmPassword,
            });

            setMessage("Senha redefinida com sucesso!");
            setTimeout(() => navigate("/login"), 3000);

            } 
            catch (erro) {
                console.log(erro);
                setMessage(
                    erro.response?.data?.message ||
                    "Erro ao redefinir a senha. Verifique o link ou tente novamente."
                );
            }
    
        }



    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title p-20">Alterar senha</h1>
                    {
                        message &&
                        <div className="alert">
                            <p>{message}</p>
                        </div>
                    }

                    <div className='p-20'>
                        <input type="password" 
                        placeholder="Nova senha" 
                        className={getInputClass(error.password)}
                        name="password"
                        value={model.password}
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

                    <div className='p-20'>
                        <input type="password" 
                        placeholder="Confirme a nova senha" 
                        className={getInputClass(error.confirmPassword)}
                        name="confirmPassword"
                        value={model.confirmPassword}
                        onChange={handleChangeField}
                        onBlur={handleBlurField}
                        />
                        {
                            <MensagemErro
                                error = {error.confirmPassword}
                                mensagem = {error.confirmPasswordMensagem}
                            />
                        }
                    </div>
                    
                   
                    <button className='btn btn-block'>Salvar</button>
                    <p className='message'>Acesso ao sistema: <Link to='/login'>Login</Link> </p>
                </form>
            </div>
        </div>
    )
}