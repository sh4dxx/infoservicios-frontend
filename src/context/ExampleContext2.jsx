import { createContext, useState } from 'react'

export const Context2 = createContext() // Crear el contexto

const Context2Provider = ({ children }) => { // Se esta proviendo el contexto a los componentes hijos
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)

  const stateGlobal = { increment, decrement, total: count }

  return (
    <Context2.Provider value={stateGlobal}>
      {children}
    </Context2.Provider>
  )
}

export default Context2Provider
