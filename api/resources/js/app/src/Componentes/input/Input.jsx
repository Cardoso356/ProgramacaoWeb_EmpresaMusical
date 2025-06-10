import React, { Fragment } from 'react'
import MensagemErro from '../Mensagens/MensagemErro';

const Input = ({
  id,
  type,
  value,
  placeholder,
  handleChangeField,
  handleBlurField,
  error,
  mensagem
}) => {

  const getInputClass = (error) => {

        if(error){
            return "form-control is-invalid";
        } else if (error === false){
            return "form-control is-valid";
        }
        return "form-control";

    };

  return (
    <Fragment>
      <input 
        id={id}
        type={type}
        value={value || ''} //ele nunca pode ser nulo, pode ser vazio mas não nulo
        name={id} //o id vem com o nome do campo, desse jeito
        placeholder={placeholder}
        className={getInputClass(error)}  
        onChange={handleChangeField} 
        onBlur={handleBlurField}/>
        {
          <MensagemErro
              error = {error}
              mensagem = {mensagem}
          />
        }


    </Fragment>
  )
}

export default Input;