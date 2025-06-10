import { MUSICA, ERROR_MUSICA } from "../types/Musica";
import useValidator from "../hook/useValidator";

const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";

const musicaValidationRules = {

    nomeMusica:(nomeMusica)=>{

        let mensagens = [];
        if(!nomeMusica || nomeMusica.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o título da música');
        }
        return mensagens;
    },

    genero:(genero)=>{

        let mensagens = [];
        if(!genero || genero.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o gênero da música');
        }
        return mensagens;
    },

    gravadora:(gravadora)=>{

        let mensagens = [];
        if(!gravadora || gravadora.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar a gravadora da música');
        }
        return mensagens;

    },

    albumId:(albumId)=>{

        let mensagens = [];
        if(!albumId || albumId.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar o álbum da música');
        }
        return mensagens;
    },

}

export const useValidarDadosMusica = () => {
    return useValidator(MUSICA, ERROR_MUSICA, musicaValidationRules);
}