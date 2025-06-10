import { ERROR_USER, USER } from "../types/User";
import useValidator from "../hook/useValidator";


const PASSWORD_LENGTH = 6;


const userValidationRules = {

    name:(name)=>{

        let mensagens = [];
        if(!name || name.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o nome do usuário');
        }
        return mensagens;
    },

    email:(email)=>{

        let mensagens = [];
        if(!email || email.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar um e-mail');
        }
        return mensagens;
    },

    password:(password)=>{

        let mensagens = [];
        if(!password || password.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar a senha');
        }

        if( password.length < PASSWORD_LENGTH){
            mensagens.push('A senha deve conter no mínimo 6 caracteres');
        }
         
        return mensagens;

    },
}

export const useValidarDadosUsuario = () => {
    return useValidator(USER, ERROR_USER, userValidationRules);
}