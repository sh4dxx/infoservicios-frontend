import { createContext, useState } from 'react'
import api from '../config/api'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const logout = () => {
    localStorage.setItem('token', null)
    setUserToken(false)
    setEmail('')
  }

  const handleSubmitLogin = async () => {
    const response = await api.post('/auth/login', { email, password })
    localStorage.setItem('token', response.data.token)
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
    userToken,
    logout,
    email,
    password,
    setEmail,
    setPassword,
    handleSubmitLogin,
    handleSubmitRegister
  }

  return <UserContext.Provider value={userProviderValues}>{children}</UserContext.Provider>
}
export default UserProvider
