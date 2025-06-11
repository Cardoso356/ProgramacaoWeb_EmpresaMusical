import { MUSICOALBUM, ERROR_MUSICOALBUM } from "../types/MusicoAlbum";
import useValidator from "../hook/useValidator";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";

const musicoalbumUpdateValidationRules = {

    musicoId:(musicoId)=>{

        let mensagens = [];
        if(!musicoId || musicoId.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o Id do músico relacionado ao instrumento');
        }
        return mensagens;
    },

    albumId:(albumId)=>{

        let mensagens = [];
        if(!albumId || albumId.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o Id do álbum relacionado ao músico');
        }
        return mensagens;
    },

}

export const useValidarDadosMusicoAlbumUpdate = () => {
    return useValidator(MUSICOALBUM, ERROR_MUSICOALBUM, musicoalbumUpdateValidationRules);
}