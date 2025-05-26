import React, { Fragment } from 'react'

const mensagemErro = () => ({

    error,
    mensagem
}) => {
  return (
    <Fragment>
        {
            error && (
                <div className='invalid-feedback'>
                    {
                        mensagem.map((mens, index)=>{
                            <p key={index} style={{ margin: "0", color: "red" }}>
                                <span>{mens}</span>
                            </p>
                        })
                    }
                </div>
            )
        }
    </Fragment>
  )
}

export default mensagemErro

/*
0 - valor invalido para o email
1 - obrigatorio informar o email
    o map é um foreach
*/