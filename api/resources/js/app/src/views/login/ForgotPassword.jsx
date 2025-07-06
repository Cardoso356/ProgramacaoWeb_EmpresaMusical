import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axiosClient from "../../axiosClientjs";
import { useValidarDadosForgot } from "../../rules/ForgotValidationsRules";
import MensagemErro from "../../Componentes/Mensagens/MensagemErro";

export default function ForgotPassword(){

const {
    model, 
    error, 
    formValid, 
    handleChangeField, 
    handleBlurField,

    } = useValidarDadosForgot();

    const navigate = useNavigate();

    const [message, setMessage] = useState(null);

    const getInputClass = (error) => {

        if(error){
            return "form-control is-invalid";
        } else if (error === false){
            return "form-control is-valid";
        }
        return "form-control";

    }

     const onSubmit = async (e) => {
        e.preventDefault();

        const valido = formValid();
        if (!valido || error.email) {
            setMessage("Verifique o e-mail antes de enviar.");
            return;
        }

        try {
            const response = await axiosClient.post('/forgotPassword', {
                email: model.email
            });

            setMessage("Verifique sua caixa de e-mail. O link de redefinição foi enviado.");
            
        } catch (erro) {
            console.log(erro);
            if (erro.response?.data?.message) {
                setMessage(erro.response.data.message);
            } else {
                setMessage("Erro ao enviar link de recuperação.");
            }
        }
    };


    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title p-20">E-mail para redefinição de senha</h1>
                    {
                        message &&
                        <div className="alert">
                            <p>{message}</p>
                        </div>
                    }
                    <div className='p-20'>
                        <input type="text" 
                        placeholder="E-mail" 
                        className={getInputClass(error.email)}
                        name="email"
                        value={model.email}
                        onChange={handleChangeField}
                        onBlur={handleBlurField}
                        />
                        {
                            <MensagemErro
                                error = {error.email}
                                mensagem = {error.emailMensagem}
                            />
                        }
                    </div>

                    <button className='btn btn-block'>Redefinir senha</button>
                    <p className='message'>Deseja retornar para o Login ? <Link to='/login'>Login</Link> </p>
                </form>
            </div>
        </div>
    )
}