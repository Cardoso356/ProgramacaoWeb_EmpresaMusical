import useValidator from "../hook/useValidator";
import { CHANGEPASSWORD, ERRO_CHANGEPASSWORD } from "../types/ChangePassword";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";
const PASSWORD_LENGTH = 6;

const changepasswordValidationRules = { //regras de negócio para as validações

    passwordAtual:(passwordAtual)=>{

        let mensagens = [];
        if(!passwordAtual || passwordAtual.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar a senha atual');
        }


        if( passwordAtual.length < PASSWORD_LENGTH){
            mensagens.push('A senha deve conter no mínimo 6 caracteres');
        }

        return mensagens;
    },

    novaPassword:(novaPassword)=>{

        let mensagens = [];
        if(!novaPassword || novaPassword.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar a nova senha');
        }
        

        if( novaPassword.length < PASSWORD_LENGTH){
            mensagens.push('A senha deve conter no mínimo 6 caracteres');
        }

        return mensagens;
    },

    confirmPassword:(confirmPassword, allFields)=>{
        let mensagens = [];

        if(!confirmPassword || confirmPassword.trim().length === 0){
            mensagens.push('É obrigatório confirmar a senha');
        }else {
            if( confirmPassword != allFields.novaPassword){
                mensagens.push('A senhas não coincidem');
            }
        }

        return mensagens;
    }   

}

export const useValidarDadosChangePassword = () => {
    return useValidator(CHANGEPASSWORD, ERRO_CHANGEPASSWORD, changepasswordValidationRules);
}

