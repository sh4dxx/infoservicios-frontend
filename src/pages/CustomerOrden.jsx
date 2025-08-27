// src/pages/CustomerOrder.jsx
import { useMemo, useContext } from 'react'
import { CartContext } from '../context/CartContext'

const CustomerOrden = ({ data }) => {
  // MOCK (se usa si no recibes "data" por props)
  const mock = {
    contrato: {
      id: 2,
      cliente_id: 9,
      total: 50000,
      finalizado: false,
      detalle: [
        {
          id: 3,
          cantidad: 2,
          precio_unitario: 10000,
          valoracion: 0,
          finalizado: false,
          servicio: {
            id: 2,
            titulo: 'Organización de Espacios',
            descripcion: 'Diseño y construcción de muebles personalizados.',
            detalle: 'Muebles de cocina, baño, oficina. Desde $30.000.',
            precio: 10000,
            foto: 'https://www.lascasasprefabricadas.com/wp-content/uploads/2017/09/muebles-cocina-madera-12.jpg',
            activo: true,
            categoria_id: 3,
            valoracion: 5,
            trabajor: {
              id: 8,
              correo: 'cliente.hogar@correo.cl',
              nombre: 'Camila_Silva',
              ap_paterno: 'Silva',
              ap_materno: 'Torres',
              rut: '22.345.678-9',
              telefono: '+56 9 9234 5678',
              activo: true
            }
          }
        },
        {
          id: 3,
          cantidad: 2,
          precio_unitario: 5000,
          valoracion: 0,
          finalizado: false,
          servicio: {
            id: 3,
            titulo: 'Mantenimiento de Jardín',
            descripcion: 'Mantencion de jardin',
            detalle: 'Mantencion de jardin',
            precio: 5000,
            foto: 'https://www.lascasasprefabricadas.com/wp-content/uploads/2017/09/muebles-cocina-madera-12.jpg',
            activo: true,
            categoria_id: 3,
            valoracion: 5,
            trabajor: {
              id: 8,
              correo: 'cliente.hogar@correo.cl',
              nombre: 'Juan Jose',
              ap_paterno: 'Silva',
              ap_materno: 'Torres',
              rut: '22.345.678-9',
              telefono: '+56 9 9234 5678',
              activo: true
            }
          }
        },
        {
          id: 3,
          cantidad: 1,
          precio_unitario: 25000,
          valoracion: 0,
          finalizado: false,
          servicio: {
            id: 4,
            titulo: 'Instalación de Sistema de Riego',
            descripcion: 'Instalación de Sistema de Riego',
            detalle: 'Instalación de Sistema de Riego',
            precio: 25000,
            foto: 'https://www.lascasasprefabricadas.com/wp-content/uploads/2017/09/muebles-cocina-madera-12.jpg',
            activo: true,
            categoria_id: 3,
            valoracion: 5,
            trabajor: {
              id: 8,
              correo: 'cliente.hogar@correo.cl',
              nombre: 'Juan Jose',
              ap_paterno: 'Silva',
              ap_materno: 'Torres',
              rut: '22.345.678-9',
              telefono: '+56 9 9234 5678',
              activo: true
            }
          }
        }
      ]
    }
  }

  const { numFormat } = useContext(CartContext)
  const contrato = mock.contrato

  // —— Resumen (usa mismas clases globales del CartPage) ——
  const discount = 0
  const taxRate = 0.19
  const itemsSubtotal = useMemo(() => contrato.detalle.reduce((acc, d) => acc + d.cantidad * d.precio_unitario, 0), [contrato.detalle])
  const tax = Math.round((itemsSubtotal - discount) * taxRate)
  const subTotal = itemsSubtotal - discount + tax
  const shippingCost = 3000
  const grandTotal = subTotal + shippingCost

  return (
    <>
      <div className='container my-4'>
        {/* Header */}
        <div className='d-flex flex-wrap align-items-center gap-2 mb-3'>
          <h3 className='mb-0'>Order #{contrato.id}</h3>
          <span className='text-muted'>Customer ID : {contrato.cliente_id}</span>
        </div>

        <div className='row g-4'>
          {/* IZQUIERDA: detalles de contacto / envío / otros */}
          <div className='col-12 col-lg-8'>
            <div className='cart-card p-3 p-md-4 mb-4'>
              <div className='row gx-4 gy-4'>
                {/* Billing */}
                <div className='col-12 col-md-4'>
                  <h5 className='mb-3'>Billing details</h5>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-person me-2' />
                      <h6 className='mb-0'>Customer</h6>
                    </div>
                    <div className='ms-4 small text-body-secondary'>Shatinon Mekalan</div>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-envelope me-2' />
                      <h6 className='mb-0'>Email</h6>
                    </div>
                    <a href='mailto:shatinon@jeemail.com' className='ms-4 small'>
                      shatinon@jeemail.com
                    </a>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-telephone me-2' />
                      <h6 className='mb-0'>Phone</h6>
                    </div>
                    <a href='tel:+1234567890' className='ms-4 small'>
                      +1234567890
                    </a>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-house me-2' />
                      <h6 className='mb-0'>Address</h6>
                    </div>
                    <div className='ms-4 text-body-secondary small'>
                      Shatinon Mekalan
                      <br />
                      Vancouver, British Columbia, Canada
                    </div>
                  </div>
                </div>

                {/* Shipping */}
                <div className='col-12 col-md-4'>
                  <h5 className='mb-3'>Shipping details</h5>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-envelope me-2' />
                      <h6 className='mb-0'>Email</h6>
                    </div>
                    <a href='mailto:shatinon@jeemail.com' className='ms-4 small'>
                      shatinon@jeemail.com
                    </a>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-telephone me-2' />
                      <h6 className='mb-0'>Phone</h6>
                    </div>
                    <a href='tel:+1234567890' className='ms-4 small'>
                      +1234567890
                    </a>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-house me-2' />
                      <h6 className='mb-0'>Address</h6>
                    </div>
                    <div className='ms-4 text-body-secondary small'>
                      Shatinon Mekalan
                      <br />
                      Vancouver, British Columbia, Canada
                    </div>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-calendar-date me-2' />
                      <h6 className='mb-0'>Shipping Date</h6>
                    </div>
                    <div className='ms-4 text-body-secondary small'>{new Date().toLocaleDateString('es-CL')}</div>
                  </div>
                </div>

                {/* Other details */}
                <div className='col-12 col-md-4'>
                  <h5 className='mb-3'>Other details</h5>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-bag me-2' />
                      <h6 className='mb-0'>Gift order</h6>
                    </div>
                    <div className='ms-4 text-body-secondary small'>Yes</div>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-box-seam me-2' />
                      <h6 className='mb-0'>Wrapping</h6>
                    </div>
                    <div className='ms-4 text-body-secondary small'>Magic wrapper</div>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-file-text me-2' />
                      <h6 className='mb-0'>Recipient</h6>
                    </div>
                    <div className='ms-4 text-body-secondary small'>Monjito Shiniga</div>
                  </div>
                  <div className='mb-2'>
                    <div className='d-flex align-items-center mb-1'>
                      <i className='bi bi-envelope-paper me-2' />
                      <h6 className='mb-0'>Gift Message</h6>
                    </div>
                    <div className='ms-4 text-body-secondary small'>
                      Happy Birthday!
                      <br />
                      Yours,
                      <br />
                      Mekalan
                    </div>
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
                <span>${numFormat(itemsSubtotal)}</span>
              </div>
              <div className='summary-line'>
                <span>Discount :</span>
                <span className='text-danger'>-{numFormat(discount)}</span>
              </div>
              <div className='summary-line'>
                <span>Tax :</span>
                <span>${numFormat(tax)}</span>
              </div>
              <div className='summary-line'>
                <span>Subtotal :</span>
                <span>${numFormat(subTotal)}</span>
              </div>
              <div className='summary-line'>
                <span>Shipping Cost :</span>
                <span>${numFormat(shippingCost)}</span>
              </div>

              <hr />
              <div className='d-flex justify-content-between align-items-center'>
                <div className='summary-total'>Total :</div>
                <div className='summary-total'>${numFormat(grandTotal)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className='row g-4'>
          {/* Abajo: listado de productos (divs, sin tabla) */}
          <div className='cart-card p-3 p-md-4'>
            <div className='row fw-semibold text-muted small pb-2 border-bottom'>
              <div className='col-6 col-md-6'>PRODUCTOS</div>
              <div className='col-2 d-none d-md-block text-center'>PRECIO</div>
              <div className='col-2 d-none d-md-block text-center'>CANTIDAD</div>
              <div className='col-2 d-none d-md-block text-end'>TOTAL</div>
            </div>

            {contrato.detalle.map((d, i) => (
              <div key={`${d.servicio?.id}-${i}`} className='item-row'>
                <div className='row align-items-center gy-3'>
                  {/* Producto */}
                  <div className='col-12 col-md-6'>
                    <div className='d-flex align-items-center gap-3'>
                      <img src={d.servicio?.foto} alt={d.servicio?.titulo} className='thumb' />
                      <div>
                        <a className='fw-semibold text-decoration-none' href='#'>
                            {d.servicio?.titulo}
                          </a>
                        <div className='text-muted small'>{d.servicio?.descripcion}</div>
                      </div>
                    </div>
                  </div>

                  {/* Precio/Cantidad/Total (desktop) */}
                  <div className='col-12 col-md-2 d-none d-md-block text-center'>${numFormat(d.precio_unitario)}</div>
                  <div className='col-12 col-md-2 d-none d-md-block text-center'>{d.cantidad}</div>
                  <div className='col-12 col-md-2 d-none d-md-block text-end fw-semibold'>${numFormat(d.cantidad * d.precio_unitario)}</div>

                  {/* En móviles: info compacta */}
                  <div className='col-12 d-md-none'>
                    <div className='d-flex justify-content-between text-muted small'>
                      <span>Precio: ${numFormat(d.precio_unitario)}</span>
                      <span>Cant.: {d.cantidad}</span>
                      <span className='fw-semibold'>Total: ${numFormat(d.cantidad * d.precio_unitario)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Items subtotal */}
            <div className='d-flex justify-content-end mt-2'>
              <div className='fw-bold'>Items subtotal:&nbsp;&nbsp;${numFormat(itemsSubtotal)}</div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default CustomerOrden
