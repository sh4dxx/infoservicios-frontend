import { useState, useEffect } from 'react'

export default function useLocalStorage (key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      return saved ? JSON.parse(saved) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // si localStorage falla (modo privado, etc.)
    }
  }, [key, value])

  return [value, setValue]
}
