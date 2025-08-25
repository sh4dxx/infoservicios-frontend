import api from '../config/api'
import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [userToken, setUserToken] = useState(false)
  const [loading, setLoading] = useState(true)

  // Cargar datos guardados al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
      setUserToken(savedToken)
    }
    setLoading(false)
  }, [])

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    if (user && userToken) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', userToken)
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }, [user, userToken])

  // Login contra backend
  const handleSubmitLogin = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { correo: email, password })
      const { user, token } = res.data

      setUser(user)
      setUserToken(token)

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      return true
    } catch (err) {
      console.error('Error de autenticación:', err)
      throw err
    }
  }

  const handleLogout = () => {
    localStorage.setItem('token', null)
    setUserToken(false)
  }

  // const handleSubmitLogin = async () => {
  //   console.log('params => ' + email, password)
  //   // Simulación de llamada a API

  //   const response = await api.get('personas/1')
  //   // const response = await api.post('/auth/login', { email, password })
  //   console.log(response)
  //   localStorage.setItem('token', response.data.contrasena)
  //   setUserToken(true)
  // }

  const handleSubmitRegister = async (user) => {
    const response = await api.post('/auth/register', { user })
    localStorage.setItem('token', response.data.token)
    setUserToken(true)
  }

  const userProviderValues = {
    user,
    loading,
    userToken,
    handleLogout,
    handleSubmitLogin,
    handleSubmitRegister
  }

  return (
    <UserContext.Provider value={userProviderValues}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
