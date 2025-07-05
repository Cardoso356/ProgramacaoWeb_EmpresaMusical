import useValidator from "../hook/useValidator";
import { UPDATEPASSWORD, ERRO_UPDATEPASSWORD } from "../types/UpdatePassword";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";
const PASSWORD_LENGTH = 6;

const updatepasswordValidationRules = { //regras de negócio para as validações

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

    confirmPassword:(confirmPassword, allFields)=>{
        let mensagens = [];

        if(!confirmPassword || confirmPassword.trim().length === 0){
            mensagens.push('É obrigatório confirmar a senha');
        }else {
            if( confirmPassword != allFields.password){
                mensagens.push('A senhas não coincidem');
            }
        }

        return mensagens;
    }   

}

export const useValidarDadosUpdatePassword = () => {
    return useValidator(UPDATEPASSWORD, ERRO_UPDATEPASSWORD, updatepasswordValidationRules);
}

