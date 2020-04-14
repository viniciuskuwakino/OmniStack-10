import React, { useState, useEffect } from 'react'
import api from './services/api'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

import DevForm from './components/DevForm'
import DevItem from './components/DevItem'

//O que é REACT?
//Componente -> exemplo o (function App()), função que retorna algum conteudo HTML(ou CSS, JS) 
//Propriedade -> atributo para um componente, ou, informaçoes que um componente PAI passa para outro componente FILHO
//Estado -> Informacoes mantidas pelo componente (Lembrar: imutabilidade) 

function App() {

  const [devs, setDevs] = useState([])

  // [] -> executa uma vez ao deixar o array vazio
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs')

      setDevs(response.data)
    }

    loadDevs()
  }, [])

  async function handleAddDev(data) {
    const response = await api.post('/devs', data)

    setDevs([...devs, response.data])
  }

  return (

    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>

  );
}

export default App
