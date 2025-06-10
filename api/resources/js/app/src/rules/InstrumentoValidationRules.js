import { INSTRUMENTO, ERROR_INSTRUMENTO } from "../types/Instrumento";
import useValidator from "../hook/useValidator";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";

const instrumentoValidationRules = {

    nomeInstrumento:(nomeInstrumento)=>{

        let mensagens = [];
        if(!nomeInstrumento || nomeInstrumento.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o nome do instrumento');
        }
        return mensagens;
    },

    tipo:(tipo)=>{

        let mensagens = [];
        if(!tipo || tipo.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o tipo do instrumento');
        }
        return mensagens;
    },

    marca:(marca)=>{

        let mensagens = [];
        if(!marca || marca.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar a marca do instrumento');
        }
        return mensagens;

    },

    modelo:(modelo)=>{

        let mensagens = [];
        if(!modelo || modelo.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o modelo do instrumento');
        }
        return mensagens;
    },

}

export const useValidarDadosInstrumento = () => {
    return useValidator(INSTRUMENTO, ERROR_INSTRUMENTO, instrumentoValidationRules);
}