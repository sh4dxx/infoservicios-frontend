// src/pages/CustomerOrder.jsx
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

const CustomerOrden = ({ data }) => {
  const { numFormat } = useContext(CartContext)
  const contrato = data.response.data.contrato
  const discount = 0
  const taxRate = 0.19
  console.log('data', data)
  const subTotal = data.total
  // const itemsSubtotal = useMemo(() => contrato.detalle.reduce((acc, d) => acc + d.cantidad * d.precio_unitario, 0), [contrato.detalle])
  const tax = 0

  return (
    <>
      <div className='container my-4'>
        {/* Header */}
        <div className='d-flex flex-wrap align-items-center gap-2 mb-3'>
          <h3 className='mb-0'>Order #{data.response.data.contrato.id}</h3>
          <span className='text-muted'>Customer ID : {contrato.cliente_id}</span>
        </div>

        <div className='row g-4'>
          {/* IZQUIERDA: detalles de contacto / envío / otros */}
          <div className='col-12 col-lg-8'>
            <div className='cart-card p-3 p-md-4'>
              <div className='row gx-4 gy-4'>
                {/* Billing */}
                <div className='col-12 col-md-6'>
                  <h5 className='mb-3'>Detalles del servicio</h5>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-person me-2' />
                      <h6 className='mb-0'>Cliente</h6>
                    </div>
                    <div className='ms-4 small text-body-secondary'>{`${data.user.nombre} ${data.user.ap_paterno} ${data.user.ap_materno}`}</div>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-person me-2' />
                      <h6 className='mb-0'>Rut</h6>
                    </div>
                    <div className='ms-4 small text-body-secondary'>{data.user.rut}</div>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-envelope me-2' />
                      <h6 className='mb-0'>Email</h6>
                    </div>
                    <a href={`mailto:${data.user.correo}`} className='ms-4 small'>
                      {data.user.correo}
                    </a>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-telephone me-2' />
                      <h6 className='mb-0'>Phone</h6>
                    </div>
                    <a href={`tel:${data.user.telefono}`} className='ms-4 small'>
                      {data.user.telefono}
                    </a>
                  </div>
                </div>

                {/* Shipping */}
                <div className='col-12 col-md-6'>
                  <h5 className='mb-3'> `</h5>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-envelope me-2' />
                      <h6 className='mb-0'>Metodo de pago</h6>
                    </div>
                    <h6 className='ms-4 small' />
                    <div className='ms-4 small text-body-secondary'>Transferencia bancaria</div>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-telephone me-2' />
                      <h6 className='mb-0'>Cantidad Items</h6>
                    </div>
                    <div className='ms-4 small text-body-secondary'>{data.cart2.length}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* DERECHA: Summary (mismo estilo del CartPage) */}
          <div className='col-12 col-lg-4'>
            <div className='summary-card p-3 p-md-4 sticky-lg'>
              <div className='d-flex align-items-center justify-content-between mb-3'>
                <h4 className='mb-0'>Summary</h4>
                <button className='btn btn-link btn-sm p-0'>Print</button>
              </div>

              <div className='summary-line'>
                <span>Items subtotal :</span>
                <span>${numFormat(subTotal)}</span>
              </div>
              <div className='summary-line'>
                <span>Descuento :</span>
                <span className='text-danger'>-{numFormat(discount)}</span>
              </div>
              <div className='summary-line'>
                <span>Impuesto :</span>
                <span>${numFormat(tax)}</span>
              </div>
              <div className='summary-line'>
                <span>Subtotal :</span>
                <span>${numFormat(subTotal)}</span>
              </div>

              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <div className='summary-total'>Total :</div>
                <div className='summary-total'>${numFormat(data.total)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className='row g-4'>
          <div className='cart-card p-3 p-md-4'>
            <div className='row fw-semibold text-muted small pb-2 border-bottom'>
              <div className='col-6 col-md-6'>PRODUCTOS</div>
              <div className='col-2 d-none d-md-block text-center'>PRECIO</div>
              <div className='col-2 d-none d-md-block text-center'>CANTIDAD</div>
              <div className='col-2 d-none d-md-block text-end'>TOTAL</div>
            </div>

            {data.cart2.map((d, key) => (
              <div key={`${key}`} className='item-row'>
                <div className='row align-items-center gy-3'>

                  <div className='col-12 col-md-6'>
                    <div className='d-flex align-items-center gap-3'>
                      <img src={d.foto} alt={d.titulo} className='thumb' />
                      <div>
                        <a className='fw-semibold text-decoration-none' href='#'>
                          {d.titulo}
                        </a>
                        <div className='text-muted small'>{d.descripcion}</div>
                      </div>
                    </div>
                  </div>

                  <div className='col-12 col-md-2 d-none d-md-block text-center'>${numFormat(d.precio)}</div>
                  <div className='col-12 col-md-2 d-none d-md-block text-center'>{d.count}</div>
                  <div className='col-12 col-md-2 d-none d-md-block text-end fw-semibold'>${numFormat(d.count * d.precio)}</div>

                  <div className='col-12 d-md-none'>
                    <div className='d-flex justify-content-between text-muted small'>
                      <span>Precio: ${numFormat(d.precio)}</span>
                      <span>Cant.: {d.count}</span>
                      <span className='fw-semibold'>Total: ${numFormat(d.count * d.precio)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className='d-flex justify-content-end mt-2'>
              <div className='fw-bold'>Items subtotal:&nbsp;&nbsp;${numFormat(subTotal)}</div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default CustomerOrden
