import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//import { Routes } from 'react-router-dom'
import Rotas from './routes/Routes'
import ContextProvider from './context/ContextProvider'
//import DefaultLayout from './Componentes/DefaultLayout'

function App() {

  return (
    
    <>
      <ContextProvider>
        <Rotas/>
      </ContextProvider>
    </>
    
    
  )
}

export default App
