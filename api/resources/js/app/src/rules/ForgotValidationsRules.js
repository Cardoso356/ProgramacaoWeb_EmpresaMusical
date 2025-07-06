//import { ERRO_LOGIN } from "../types/login";
import useValidator from "../hook/useValidator";
import { FORGOT, ERRO_FORGOT } from "../types/Forgot";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";

const forgotValidationRules = { //regras de negócio para as validações

    email:(email)=>{

        let mensagens = [];
        if(!email || email.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar um e-mail');
        }
        return mensagens;
    },

}


export const useValidarDadosForgot = () => {
    return useValidator(FORGOT, ERRO_FORGOT, forgotValidationRules);
}

