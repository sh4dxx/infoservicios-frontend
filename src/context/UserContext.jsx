import api from '../config/api'
import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [isToken, setIsToken] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')
    if (savedUser && savedToken) {
      console.log('UserContext: cargando usuario desde localStorage')
      setUser(JSON.parse(savedUser))
      setIsToken(true)
    }
  }, [])

  // useEffect(() => {
  //   if (user && userToken) {
  //     localStorage.setItem('user', JSON.stringify(user))
  //     localStorage.setItem('token', userToken)
  //   } else {
  //     localStorage.removeItem('user')
  //     localStorage.removeItem('token')
  //   }
  // }, [user, userToken])

  const handleSubmitLogin = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { correo: email, password })
      const { user, token } = res.data

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)

      setUser(user)
      setIsToken(true)
      api.defaults.headers.common.Authorization = `Bearer ${token}`
      return true
    } catch (err) {
      console.error('Error de autenticación:', err)
      throw err
    }
  }

  const handleSubmitRegister = async (userData) => {
    try {
      console.log('context ', userData)
      const response = await api.post('/auth/register', userData)
      const { user, token } = response.data

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      setUser(user)
      setIsToken(true)
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      return true
    } catch (err) {
      console.error('Error de al registrar usuario:', err)
      throw err
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser({})
    setIsToken(false)
  }

  const userProviderValues = {
    user,
    isToken,
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
