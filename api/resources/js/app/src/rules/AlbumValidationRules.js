import { ALBUM, ERROR_ALBUM } from "../types/Album";
import useValidator from "../hook/useValidator";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";

const albumValidationRules = {

    tituloAlbum:(tituloAlbum)=>{

        let mensagens = [];
        if(!tituloAlbum || tituloAlbum.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o título do álbum');
        }
        return mensagens;
    },

    formato:(formato)=>{

        let mensagens = [];
        if(!formato || formato.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o formato do álbum');
        }
        return mensagens;
    },

    dataAlbum:(dataAlbum)=>{

        let mensagens = [];
        if(!dataAlbum || dataAlbum.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar a data de lançamento do álbum');
        }
        return mensagens;

    },

}

export const useValidarDadosAlbum = () => {
    return useValidator(ALBUM, ERROR_ALBUM, albumValidationRules);
}