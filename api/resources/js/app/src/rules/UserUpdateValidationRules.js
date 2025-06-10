import useValidator from "../hook/useValidator";
import { USER, ERROR_USER } from "../types/User";

const userUpdateValidationRules = {

    name:(name)=>{
        let mensagens = [];
        if(!name || name.trim().length === 0) {
            mensagens.push('Obrigatório informar o nome do usuário');
        }

        return mensagens;
    },

    email:(email)=>{
        let mensagens = [];
        if(!email || email.trim().length === 0) {
            mensagens.push('Obrigatório informar um e-mail');
        }

        return mensagens;
    },

}

export const useValidarDadosUpdateUsuario = () => {
    return useValidator(USER, ERROR_USER, userUpdateValidationRules);
}