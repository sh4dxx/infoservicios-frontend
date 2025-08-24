import { createContext, useState, useContext } from 'react'
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    // Aquí podrías usar axios.post("/login", { email, password })
    if (email === 'test@test.com' && password === '1234') {
      setUser({ email })
    }
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
