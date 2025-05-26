
const NUMBER = '0123456789';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const SPECIALCHARACTER = "!'^%&#()=?@";
const PASSWORD_LENGTH = 8;

const loginValidationRoules = { //regras de negócio para as validações

    email:(email)=>{

        let mensagens = [];
        if(!email || email.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar um e-mail');
        }
    },

    password:(password)=>{

        let mensagens = [];
        if(!password || password.trim().length === 0){ //o trim remove todos os espaços em branco e o lenght é o tamanho
            mensagens.push('Obrigatório informar a senha');
        }

        if(password && password.length < PASSWORD_LENGTH){
            mensagens.push('A senha deve conter 8 caracteres');
        }

        const hasNumber = [...password].some((char)=>{
        NUMBER.includes(char); //verifica se tem algo dentro dele
        });

        if(!hasNumber){
            mensagens.push('A senha deve conter pelo menos 1 número');
        }

        const hasLowerCase = [...password].some((char)=>{
        LOWERCASE.includes(char); //verifica se tem algo dentro dele
        });

        if(!hasLowerCase){
            mensagens.push('A senha deve conter pelo menos 1 caracter minúsculo');
        }

    },

    

}

