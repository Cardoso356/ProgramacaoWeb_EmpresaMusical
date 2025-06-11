import { MUSICOINSTRUMENTO, ERROR_MUSICOINSTRUMENTO } from "../types/MusicoInstrumento";
import useValidator from "../hook/useValidator";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";

const musicoinstrumentoValidationRules = {

    musicoId:(musicoId)=>{

        let mensagens = [];
        if(!musicoId || musicoId.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o Id do músico relacionado ao instrumento');
        }
        return mensagens;
    },

    instrumentoId:(instrumentoId)=>{

        let mensagens = [];
        if(!instrumentoId || instrumentoId.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o Id do instrumento relacionado ao músico');
        }
        return mensagens;
    },

}

export const useValidarDadosMusicoInstrumento = () => {
    return useValidator(MUSICOINSTRUMENTO, ERROR_MUSICOINSTRUMENTO, musicoinstrumentoValidationRules);
}