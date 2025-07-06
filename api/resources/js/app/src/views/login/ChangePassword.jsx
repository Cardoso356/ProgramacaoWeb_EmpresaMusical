import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axiosClient from "../../axiosClientjs";
import { useValidarDadosChangePassword } from "../../rules/ChangeUpdateValidationRules";
import MensagemErro from "../../Componentes/Mensagens/MensagemErro";

export default function ChangePassword(){

const {
    model, 
    error, 
    formValid, 
    handleChangeField, 
    handleBlurField,

    } = useValidarDadosChangePassword();

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
        if (!valido || error.passwordAtual || error.novaPassword || error.confirmPassword) {
            setMessage("Por favor, corrija os erros antes de continuar.");
            return;
        }

        const token = localStorage.getItem("TOKEN");
        console.log("Token do localStorage:", token);

        if (!token) {
            setMessage("Usuário não autenticado. Por favor, faça login.");
            return;
        }

        try {
            await axiosClient.post("/changePassword",
                {
                    passwordAtual: model.passwordAtual,
                    novaPassword: model.novaPassword,
                    novaPassword_confirmation: model.confirmPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            setMessage("Senha alterada com sucesso!");
            setTimeout(() => navigate("/user/index"), 3000);
        } catch (erro) {
            console.error(erro);
            setMessage(
                erro.response?.data?.message ||
                "Erro ao alterar a senha. Verifique os dados e tente novamente."
            );
        }
    };


    return(
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title p-20">Alterar Senha</h1>
                    {
                        message &&
                        <div className="alert">
                            <p>{message}</p>
                        </div>
                    }
                    <div className="p-20">
                        <input
                            type="password"
                            placeholder="Senha atual"
                            className={getInputClass(error.passwordAtual)}
                            name="passwordAtual"
                            value={model.passwordAtual}
                            onChange={handleChangeField}
                            onBlur={handleBlurField}
                        />
                        <MensagemErro
                            error={error.passwordAtual}
                            mensagem={error.passwordAtualMensagem}
                        />
                    </div>

                    <div className="p-20">
                        <input
                            type="password"
                            placeholder="Nova senha"
                            className={getInputClass(error.novaPassword)}
                            name="novaPassword"
                            value={model.novaPassword}
                            onChange={handleChangeField}
                            onBlur={handleBlurField}
                        />
                        <MensagemErro
                            error={error.novaPassword}
                            mensagem={error.novaPasswordMensagem}
                        />
                    </div>

                    <div className="p-20">
                        <input
                            type="password"
                            placeholder="Confirme a nova senha"
                            className={getInputClass(error.confirmPassword)}
                            name="confirmPassword"
                            value={model.confirmPassword}
                            onChange={handleChangeField}
                            onBlur={handleBlurField}
                        />
                        <MensagemErro
                            error={error.confirmPassword}
                            mensagem={error.confirmPasswordMensagem}
                        />
                    </div>

                    <button className="btn btn-edit" to="/user/index">Salvar</button>
                    <Link type="button" className="btn btn-cancel" to="/user/index">Cancelar</Link>
                </form>
            </div>
        </div>
    )
}
