import { createContext, useState } from 'react'

export const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const showLoading = () => setLoading(true)
  const hideLoading = () => setLoading(false)

  const stateGlobal = { loading, showLoading, hideLoading }

  return (
    <LoadingContext.Provider value={stateGlobal}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
