import { MUSICO, ERROR_MUSICO } from "../types/Musico";
import useValidator from "../hook/useValidator";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";

const musicoUpdateValidationRules = {

    nomeMusico:(nomeMusico)=>{

        let mensagens = [];
        if(!nomeMusico || nomeMusico.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o nome do músico');
        }
        return mensagens;
    },

    idade:(idade)=>{

        let mensagens = [];
        if(!idade || idade.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar a idade do músico');
        }
        return mensagens;
    },

    /*cpf:(cpf)=>{

        let mensagens = [];
        if(!cpf || cpf.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o cpf do músico');
        }

        if( password.length < PASSWORD_LENGTH){
            mensagens.push('A senha deve conter no mínimo 6 caracteres');
        }
         
        return mensagens;

    },*/

    telefone:(telefone)=>{

        let mensagens = [];
        if(!telefone || telefone.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o telefone do músico');
        }
        return mensagens;
    },

    endereco:(endereco)=>{

        let mensagens = [];
        if(!endereco || endereco.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o endereço do músico');
        }
        return mensagens;
    },

    cidade:(cidade)=>{

        let mensagens = [];
        if(!cidade || cidade.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar a cidade do músico');
        }
        return mensagens;
    },


}

export const useValidarDadosMusicoUpdate = () => {
    return useValidator(MUSICO, ERROR_MUSICO, musicoUpdateValidationRules);
}