import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/registrarse" element={<Register />} />

        {/* Privadas */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />


      </Routes>
    </BrowserRouter>
  )
}

export default App
