import { useCart } from '../context/CartContext'

const CartPage = () => {
  const { items, removeFromCart, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className='container my-5'>
        <h3>🛒 El carrito está vacío</h3>
      </div>
    )
  }

  return (
    <div className='container my-5'>
      <h3>🛒 Mi Carrito</h3>
      <ul className='list-group mb-3'>
        {items.map((item) => (
          <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
            <div>
              <strong>{item.titulo}</strong> (x{item.quantity})
            </div>
            <div>
              ${(item.precio * item.quantity).toLocaleString()}
              <button className='btn btn-sm btn-danger ms-3' onClick={() => removeFromCart(item.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button className='btn btn-warning me-2' onClick={clearCart}>
        Vaciar carrito
      </button>
      <button className='btn btn-primary'>Proceder al pago</button>
    </div>
  )
}

export default CartPage
