import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const ServiceModal = ({ show, onClose, service }) => {
  const { addToCart } = useContext(CartContext)
  if (!service) return null

  return (
    <>
      {show && <div className='modal-backdrop fade show' />}
      <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex='-1' role='dialog'>
        <div className='modal-dialog modal-lg modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>{service.titulo}</h5>
              <button type='button' className='btn-close' onClick={onClose} />
            </div>
            <div className='modal-body'>
              <img src={service.foto} alt={service.titulo} className='img-fluid mb-3 rounded' />
              <p>
                <strong>Descripción:</strong> {service.descripcion}
              </p>
              <p>
                <strong>Detalle:</strong> {service.detalle}
              </p>
              <p>
                <strong>Precio:</strong> ${service.precio.toLocaleString()}
              </p>
              <div>
                <strong>Valoración:</strong>{' '}
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} style={{ color: index < service.valoracion ? 'gold' : 'lightgray' }}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            <div className='modal-footer'>
              <button className='btn btn-secondary' onClick={onClose}>
                Cerrar
              </button>
              <button className='btn btn-success' onClick={() => addToCart(service)}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceModal
