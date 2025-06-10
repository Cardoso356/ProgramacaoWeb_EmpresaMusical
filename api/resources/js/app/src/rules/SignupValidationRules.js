import useValidator from "../hook/useValidator";
import { SIGNUP, ERRO_SIGNUP } from "../types/Signup";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";
const PASSWORD_LENGTH = 6;

const signupValidationRules = { //regras de negócio para as validações

    name:(name)=>{

        let mensagens = [];
        if(!name || name.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar um nome de usuário');
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


export const useValidarDadosSignup = () => {
    return useValidator(SIGNUP, ERRO_SIGNUP, signupValidationRules);
}

