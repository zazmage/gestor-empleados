import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import IniciarSesion from './pages/IniciarSesion'
import Registrarse from './pages/Registrarse'
import Horarios from './pages/Horarios'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/iniciar-sesion" element={<IniciarSesion />} />
        <Route path="/registrarse" element={<Registrarse />} />

        {/* Privadas */}
        <Route path="/" element={<Horarios />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
