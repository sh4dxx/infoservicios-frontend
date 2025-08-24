import { createContext, useContext, useReducer } from 'react'

const initialState = {
  items: []
}

// Reducer para manejar acciones del carrito
function cartReducer (state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const itemExists = state.items.find((i) => i.id === action.payload.id)
      if (itemExists) {
        // Si ya existe, aumentamos cantidad
        return {
          ...state,
          items: state.items.map((i) => (i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i))
        }
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      }
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload)
      }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

const CartContext = createContext()

// Hook personalizado para acceder al contexto
export function useCart () {
  return useContext(CartContext)
}

// Proveedor del carrito
export function CartProvider ({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return <CartContext.Provider value={{ items: state.items, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>
}
