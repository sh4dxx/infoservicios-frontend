import alert from '../../utils/alert'
import { useState, useEffect } from 'react'

const ShowContract = ({ contratos: contratosProp, api }) => {
  const [contratos, setContratos] = useState(contratosProp)
  const [loadingLike, setLoadingLike] = useState({}) // clave: `${contratoId}-${servicioId}`

  // Mantén sincronizado el prop con el estado local si cambia desde el padre
  useEffect(() => setContratos(contratosProp), [contratosProp])

  const numFormat = (value) => {
    return value.toLocaleString('de-DE')
  }
  const toggleLocalLike = (contratoId, servicioId, liked) => {
    setContratos(prev =>
      prev.map(c =>
        c.id !== contratoId
          ? c
          : {
              ...c,
              detalle: c.detalle.map(d =>
                d.servicio.id !== servicioId
                  ? d
                  : {
                      ...d,
                      // asumiendo que el flag es d.servicio.liked (ajústalo a tu nombre real)
                      servicio: { ...d.servicio, liked }
                    }
              )
            }
      )
    )
  }

  const handleButtonLikeClick = async ({ contratoId, servicioId, currentLiked }) => {
    const key = `${contratoId}-${servicioId}`
    try {
      // Optimistic update
      toggleLocalLike(contratoId, servicioId, !currentLiked)
      setLoadingLike(s => ({ ...s, [key]: true }))

      await api.post(`/contratos/contratos/${contratoId}/servicios/${servicioId}/like`)

      alert.message('success', 'Valoracion actualizada')
    } catch (error) {
      // Revertir si falla
      toggleLocalLike(contratoId, servicioId, currentLiked)
      alert.message('error', 'Error al dar like al servicio')
      console.error('Error al dar like al servicio:', error)
    } finally {
      setLoadingLike(s => {
        const { [key]: _, ...rest } = s
        return rest
      })
    }
  }

  return (
    <>
      <div className=' d-flex flex-column gap-4'>
        <h2>Mis Contratos</h2>
        {contratos.map((contrato, idx) => (

          <div key={idx}>
            <div className='row g-4'>
              <div className='col-md-12 col-lg-8'>
                <div className='cart-card p-3 p-md-4'>
                  <div className='banner-blur mb-2' style={{ '--bg': `url(${contrato.detalle[0].servicio.foto})` }}>
                    <style>{`.banner-blur:nth-of-type(${idx + 1})::before{background-image: var(--bg);}`}</style>
                    <div className='banner-overlay' />
                    <div className='position-absolute bottom-0 start-0 p-2' />
                  </div>

                  <div className='row gx-4 gy-4'>

                    <div className='col-12 col-md-6'>
                      <h5 className='mb-3'> Detalle de contrato N°{contrato.id}</h5>
                      <div className='mb-2'>
                        <div className='d-flex align-items-center'>
                          <i className='bi bi-envelope me-2' />
                          <h6 className='mb-0'>Metodo de pago</h6>
                        </div>
                        <h6 className='ms-4 small' />
                        <div className='ms-4 small text-body-secondary'>Transferencia bancaria</div>
                      </div>
                      <div className='mb-2'>
                        <div className='d-flex align-items-center'>
                          <i className='bi bi-telephone me-2' />
                          <span className='mb-0 '>Total </span>
                        </div>
                        <div className='ms-4 text-body-secondary fw-semibold'>${numFormat(contrato.total)}</div>
                      </div>
                    </div>
                  </div>
                  <div className='row g-4'>
                    <div className='cart-card p-3 p-md-4'>
                      <div className='row fw-semibold text-muted small pb-2 border-bottom'>
                        <div className='col-6 col-md-6'>PRODUCTOS</div>
                        <div className='col-1 d-none d-md-block text-center'>PRECIO</div>
                        <div className='col-1 d-none d-md-block text-center'>CANTIDAD</div>
                        <div className='col-2 d-none d-md-block text-end'>TOTAL</div>
                        <div className='col-2 d-none d-md-block text-end'>VALORACION</div>
                        {/* <div className='col-2 d-none d-md-block text-end'>ACCIONES</div> */}
                      </div>
                      {contrato.detalle.map((detalle, index) => (

                        <div key={`${index}`} className='item-row'>
                          <div className='row align-items-center gy-3'>

                            <div className='col-12 col-md-6'>
                              <div className='d-flex align-items-center gap-3'>
                                <img src={detalle.servicio.foto} alt={detalle.servicio.titulo} className='thumb' />
                                <div>
                                  <span className='fw-semibold text-decoration-none'>
                                    {detalle.servicio.titulo}
                                  </span>
                                  <div className='text-muted small'>{detalle.servicio.descripcion}</div>
                                </div>
                              </div>
                            </div>

                            <div className='col-12 col-md-1 d-none d-md-block text-center'>${numFormat(detalle.precio_unitario)}</div>
                            <div className='col-12 col-md-1 d-none d-md-block text-center'>{detalle.cantidad}</div>
                            <div className='col-12 col-md-2 d-none d-md-block text-end fw-semibold'>${numFormat(detalle.cantidad * detalle.precio_unitario)}</div>
                            <div className='col-12 col-md-2 d-none d-md-block text-end fw-semibold'>
                              <button
                                className={`btn btn-sm px-3 ${detalle.servicio.liked ? 'btn-success' : 'btn-outline-primary'}`}
                                disabled={loadingLike[`${contrato.id}-${detalle.servicio.id}`]}
                                onClick={() =>
                                  handleButtonLikeClick({
                                    contratoId: contrato.id,
                                    servicioId: detalle.servicio.id,
                                    currentLiked: detalle.servicio.liked
                                  })}
                                aria-pressed={detalle.servicio.liked}
                                title={detalle.servicio.liked ? 'Te gusta' : 'Dar like'}
                              >
                                <i className={detalle.servicio.liked ? 'fa-solid fa-thumbs-up' : 'fa-regular fa-thumbs-up'} />
                              </button>
                            </div>
                            {/* <div className='col-12 col-md-2 d-none d-md-block text-end fw-semibold'>
                              <button className='btn btn-primary btn-sm px-3'> Finalizar </button>
                            </div> */}

                            {/** PARA VERSION MOVIL */}
                            <div className='col-12 d-md-none'>
                              <div className='d-flex justify-content-between text-muted small'>
                                <span>Precio: ${numFormat(detalle.precio_unitario)}</span>
                                <span>Cant.: {detalle.cantidad}</span>
                                <span className='fw-semibold'>Total: ${numFormat(detalle.cantidad * detalle.precio_unitario)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ShowContract
