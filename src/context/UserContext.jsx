import api from '../config/api'
import { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState({
    name: '', lastName: '', email: '', token: '', role: ''
  })

  const handleChangePassword = (value) => {
    setPassword(value)
  }

  const handleChangeEmail = (value) => {
    setEmail(value)
  }

  const handleChangeUser = (userChange) => {
    setUser({ ...user, userChange }) // Mantener los otros valores del objeto user
  }

  const handleLogout = () => {
    localStorage.setItem('token', null)
    setUserToken(false)
    setEmail('')
  }

  const handleSubmitLogin = async () => {
    console.log('params => ' + email, password)
    // Simulación de llamada a API

    const response = await api.get('personas/1')
    // const response = await api.post('/auth/login', { email, password })
    console.log(response)
    localStorage.setItem('token', response.data.contrasena)
    setUserToken(true)
    setEmail(email)
  }

  const handleSubmitRegister = async () => {
    const response = await api.post('/auth/register', { email, password })
    localStorage.setItem('token', response.data.token)
    setUserToken(true)
    setEmail(email)
  }

  const userProviderValues = {
    user,
    email,
    password,
    userToken,
    handleLogout,
    handleChangeUser,
    handleChangePassword,
    handleChangeEmail,
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
