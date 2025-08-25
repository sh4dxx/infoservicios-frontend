import { createContext, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

export const CartContext = createContext()

const CartServiceProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage('cart', [])
  const [services, setServices] = useState([]) // listado de servicios

  const addToCart = (service) => {
    console.log('Agregando al carrito:', service.titulo)
    const findIndex = cart.findIndex((item) => item.id === service.id)

    const newService = {
      id: service.id,
      titulo: service.titulo,
      descripcion: service.descripcion,
      precio: service.precio,
      foto: service.foto,
      count: 1
    }

    if (findIndex >= 0) {
      cart[findIndex].count++
      setCart([...cart])
    } else {
      setCart([...cart, newService])
    }
  }

  const clearCart = () => {
    setCart([])
    setServices([])
  }

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => item.id !== id)
    setCart(newCart)
    setServices(newCart)
  }

  // Incrementar cantidad
  const increment = (id) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    )
    setCart(newCart)
  }

  // Decrementar cantidad
  const decrement = (id) => {
    const newCart = cart
      .map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0) // elimina si llega a 0
    setCart(newCart)
  }

  // Formatear valores de dinero
  const numFormat = (value) => {
    return value.toLocaleString('de-DE')
  }

  // Calcular total
  const total = cart.reduce((acc, el) => acc + el.precio * el.count, 0)

  const contextValues = {
    cart,
    setCart,
    services,
    addToCart,
    increment,
    decrement,
    total,
    numFormat,
    removeFromCart,
    clearCart
  }

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  )
}

export default CartServiceProvider
