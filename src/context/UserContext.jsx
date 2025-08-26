import api from '../config/api'
import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const [userToken, setUserToken] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('token')

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser))
      setUserToken(savedToken)
    }
  }, [])

  useEffect(() => {
    if (user && userToken) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', userToken)
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    }
  }, [user, userToken])

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

  const handleSubmitRegister = async (userData) => {
    try {
      console.log('context ', userData)
      const response = await api.post('/auth/register', userData)
      const { user, token } = response.data
      setUser(user)
      setUserToken(token)
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)

      api.defaults.headers.common.Authorization = `Bearer ${token}`

      return true
    } catch (err) {
      console.error('Error de al registrar usuario:', err)
      throw err
    }
  }

  const handleLogout = () => {
    localStorage.setItem('token', null)
    localStorage.setItem('user', null)
    setUser({})
    setUserToken(false)
  }

  const userProviderValues = {
    user,
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
