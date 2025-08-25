import { useContext, useState } from 'react'
import api from '../config/api'
import { CartContext } from '../context/CartContext'

const CartPage = () => {
  const { cart, increment, decrement, total, removeFromCart, clearCart, numFormat } = useContext(CartContext)

  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState('')

  const handleCheckout = async () => {
    try {
      setSending(true)
      setMsg('')
      // Ajusta el endpoint según tu backend (ej. "/ordenes" o "/checkout")
      const payload = {
        items: cart.map(({ id, titulo, precio, quantity }) => ({
          id,
          titulo,
          precio,
          quantity
        })),
        subtotal: total,
        fecha: new Date().toISOString()
      }
      await api.post('/ordenes', payload)
      clearCart()
      setMsg('¡Orden enviada con éxito!')
    } catch (e) {
      setMsg('Ocurrió un error al enviar la orden.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <div className='container my-4'>
        <h3 className='mb-3'>Carrito</h3>

        {msg && <div className='alert alert-info'>{msg}</div>}

        {cart.length === 0
          ? (
            <p className='text-muted'>Tu carrito está vacío.</p>
            )
          : (
            <>
              <div className='table-responsive'>
                <table className='table align-middle'>
                  <thead className='table-light'>
                    <tr>
                      <th>Servicio</th>
                      <th>Precio</th>
                      <th style={{ width: 160 }}>Cantidad</th>
                      <th>Total</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((prop) => (
                      <tr key={prop.id}>
                        <td className='d-flex align-items-center gap-2'>
                          <img
                            src={prop.foto}
                            alt={prop.titulo}
                            style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 8 }}
                          />
                          <span>{prop.titulo}</span>
                        </td>
                        <td>${numFormat(prop.precio)}</td>
                        <td>
                          <div className='btn-group' role='group' aria-label='cantidad'>
                            <button className='btn btn-outline-secondary' onClick={() => decrement(prop.id)}>
                              −
                            </button>
                            <button className='btn btn-outline-secondary disabled'>{prop.count}</button>
                            <button className='btn btn-outline-secondary' onClick={() => increment(prop.id)}>
                              +
                            </button>
                          </div>
                        </td>
                        <td>${numFormat((prop.precio * prop.count))}</td>
                        <td>
                          <button className='btn btn-outline-danger btn-sm' onClick={() => removeFromCart(it.id)}>
                            Quitar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan='3' className='text-end fw-bold'>Subtotal</td>
                      <td className='fw-bold'>${numFormat(total)}</td>
                      <td />
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className='d-flex gap-2 justify-content-end'>
                <button className='btn btn-outline-secondary' onClick={clearCart} disabled={sending}>
                  Vaciar carrito
                </button>
                <button className='btn btn-success' onClick={handleCheckout} disabled={sending}>
                  {sending ? 'Enviando...' : 'Confirmar compra'}
                </button>
              </div>
            </>
            )}
      </div>
    </>
  )
}

export default CartPage
