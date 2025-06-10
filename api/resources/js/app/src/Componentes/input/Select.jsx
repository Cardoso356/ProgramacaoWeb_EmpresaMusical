import React, { Fragment } from 'react';
import MensagemErro from '../Mensagens/MensagemErro';

const Select = ({
  id,
  value,
  options,
  placeholder,
  handleChangeField,
  handleBlurField,
  error,
  mensagem
}) => {

  const getSelectClass = (error) => {

    if (error) {
      return "form-control is-invalid";
    } else if (error === false) {
      return "form-control is-valid";
    }
    return "form-control";
  };

  return (
    <Fragment>
      <select
        id={id}
        name={id}
        value={value || ''}
        className={getSelectClass(error)}
        onChange={handleChangeField}
        onBlur={handleBlurField}
      >
        <option value="" disabled>{placeholder || 'Selecione uma opção'}</option>
        {options.map((opcao) => (
          <option key={opcao.value} value={opcao.value}>
            {opcao.label}
          </option>
        ))}
      </select>
      {
      <MensagemErro 
        error={error} 
        mensagem={mensagem} />
      }
    </Fragment>
  );
};

export default Select;
