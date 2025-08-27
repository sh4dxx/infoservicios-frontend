import api from '../config/api'
import alert from '../utils/alert'
import { useLoading } from '../hooks/useLoading'
import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { UserContext } from '../context/UserContext'
import CustomerOrder from './CustomerOrden'

const CartPage = () => {
  const { showLoading, hideLoading } = useLoading()
  const { user, userToken } = useContext(UserContext)
  const { cart, increment, decrement, total, removeFromCart, clearCart, numFormat } = useContext(CartContext)

  const [sending, setSending] = useState(false)
  const [msg, setMsg] = useState('')
  const [payment, setPayment] = useState('Contra entrega')
  const [voucher, setVoucher] = useState('')
  const [order, setOrder] = useState(null)
  const discount = 0
  const taxRate = 0.19

  const itemsSubtotal = total
  const tax = Math.round((itemsSubtotal - discount) * taxRate)
  const subTotal = itemsSubtotal - discount + tax

  const handleCheckout = async () => {
    const requestPayload = { user, cart, total }
    try {
      showLoading()
      setSending(true)
      setMsg('')
      const payload = {
        items: cart.map(({ id, titulo, precio, count }) => ({
          id,
          titulo,
          precio,
          quantity: count
        })),
        payment,
        discount,
        subtotal: itemsSubtotal - discount,
        total: itemsSubtotal,
        fecha: new Date().toISOString(),
        voucher: voucher || null // cupon
      }
      console.log(requestPayload)
      console.log(payload)

      await new Promise((_resolve, reject) => setTimeout(() => _resolve(), 3000))
      // cosnt response =  await api.post('/contratos/checkout', payload)
      // setOrder(response)

      // clearCart()

      // CustomerOrden
      setOrder(payload)

      alert.message('¡Orden enviada con éxito!')
    } catch (e) {
      setMsg('Ocurrió un error al enviar la orden.')
      alert.message('error', 'Opss, error al procesar la venta')
    } finally {
      setSending(false)
      hideLoading()
    }
  }

  return (
    <>
      {!order ? (
        <div className='container my-4'>
          <h3 className='mb-1'>Carro de compras</h3>
          <p className='text-muted mb-4'>Orden #3400 – Revisa los productos en tu carrito.</p>

          {msg && <div className='alert alert-info'>{msg}</div>}

          {cart.length === 0 ? (
            <p className='text-muted'>Tu carrito está vacío.</p>
          ) : (
            <div className='row g-4'>
              {/* IZQUIERDA: productos */}
              <div className='col-12 col-lg-8'>
                <div className='cart-card p-3 p-md-4'>
                  {/* Header */}
                  <div className='row fw-semibold text-muted small pb-2 border-bottom'>
                    <div className='col-6 col-md-5'>PRODUCTOS</div>
                    <div className='col-3 col-md-2 d-none d-md-block text-center'>PRECIO</div>
                    <div className='col-3 col-md-3 text-center'>CANTIDAD</div>
                    <div className='col-0 col-md-2 d-none d-md-block text-end'>TOTAL</div>
                  </div>

                  {/* Items */}
                  {cart.map((it) => (
                    <div className='item-row' key={it.id}>
                      <div className='row align-items-center gy-3'>
                        {/* Descripción */}
                        <div className='col-12 col-md-5'>
                          <div className='d-flex align-items-center gap-3'>
                            <img src={it.foto} alt={it.titulo} className='thumb' />
                            <div>
                              <p className='fw-semibold text-decoration-none' href='#'>
                                {it.titulo}
                              </p>
                              <div className='text-muted small'>{it.id}</div>
                            </div>
                          </div>
                        </div>

                        <div className='col-6 col-md-2 d-none d-md-block text-center'>${numFormat(it.precio)}</div>

                        {/* Cantidad */}
                        <div className='col-6 col-md-3'>
                          <div className='d-flex justify-content-center align-items-center gap-2'>
                            <button className='btn btn-outline-secondary qty-btn' onClick={() => decrement(it.id)}>
                              -
                            </button>
                            <div className='qty-box border rounded px-2 py-1'>{it.count}</div>
                            <button className='btn btn-outline-secondary qty-btn' onClick={() => increment(it.id)}>
                              +
                            </button>
                          </div>
                        </div>

                        {/* Total por item + borrar */}
                        <div className='col-12 col-md-2 d-flex justify-content-between justify-content-md-end align-items-center'>
                          <div className='fw-semibold d-none d-md-block'>${numFormat(it.precio * it.count)}</div>
                          <button className='btn btn-outline-danger btn-sm ms-2' onClick={() => removeFromCart(it.id)}>
                            <i className='bi bi-trash' /> <span className='d-none d-sm-inline'>Quitar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Items subtotal (abajo izquierda) */}
                  <div className='d-flex justify-content-end mt-2'>
                    <div className='fw-bold'>Items subtotal:&nbsp;&nbsp;${numFormat(itemsSubtotal)}</div>
                  </div>
                </div>

                <div className='d-flex gap-2 justify-content-between mt-3'>
                  <button className='btn btn-outline-secondary' onClick={clearCart} disabled={sending}>
                    Vaciar carrito
                  </button>
                </div>
              </div>

              {/* DERECHA: resumen */}
              <div className='col-12 col-lg-4'>
                <div className='summary-card p-3 p-md-4 sticky-lg'>
                  <div className='d-flex align-items-center justify-content-between mb-3'>
                    <h4 className='mb-0'>Resumen</h4>
                  </div>

                  {/* Método de pago */}
                  <div className='mb-3'>
                    <div className='muted-title mb-1'>Método de pago</div>
                    <select className='form-select' value={payment} onChange={(e) => setPayment(e.target.value)}>
                      <option>Transferencia</option>
                      <option>Tarjeta de crédito</option>
                    </select>
                  </div>

                  <div className='summary-line'>
                    <span>Items subtotal :</span>
                    <span>${numFormat(itemsSubtotal)}</span>
                  </div>
                  <div className='summary-line'>
                    <span>Descuento :</span>
                    <span className='text-danger'>-{numFormat(discount)}</span>
                  </div>
                  <div className='summary-line'>
                    <span>Impuesto (IVA {Math.round(taxRate * 100)}%) :</span>
                    <span>${numFormat(tax)}</span>
                  </div>

                  {/* Voucher */}
                  <div className='input-group my-3'>
                    <input className='form-control' placeholder='Cupón' value={voucher} onChange={(e) => setVoucher(e.target.value)} />
                    <button
                      className='btn btn-outline-secondary'
                      onClick={() => {
                        /* valida voucher */
                      }}
                    >
                      Aplicar
                    </button>
                  </div>

                  <hr />

                  <div className='d-flex justify-content-between align-items-center mb-3'>
                    <div className='summary-total'>Total :</div>
                    <div className='summary-total'>${numFormat(subTotal)}</div>
                  </div>

                  {!userToken
                    ? (
                      <button className='btn btn-primary btn-checkout' disabled>Proceder al pago </button>
                      )
                    : (
                      <button className='btn btn-primary btn-checkout' onClick={handleCheckout} disabled={sending}>
                        {sending ? 'Procesando…' : 'Proceder al pago ›'}
                      </button>
                      )}

                </div>
              </div>
            </div>
          )}
        </div>

      ) : (
        <CustomerOrder data={order} />
      )}

    </>
  )
}

export default CartPage
