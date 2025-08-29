import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'

const ServiceCard = ({ service, onViewMore }) => {
  const { addToCart } = useContext(CartContext)
  const isCart = true

  return (
    <>
      <div className='card h-100 shadow-sm'>
        <img src={service.foto} className='card-img-top' alt={service.titulo} style={{ objectFit: 'cover', height: '200px' }} />
        <div className='card-body d-flex flex-column'>
          <h5 className='card-title'>{service.titulo}</h5>
          <p className='card-text text-muted'>{service.descripcion}</p>
          <p className='fw-bold mt-auto'>Precio: ${service.precio.toLocaleString()}</p>

          <div className='mb-2 text-danger d-flex align-items-center gap-2'>
            <i className='fa-solid fa-thumbs-up' />
            <span className='fw-semibold'>{service.valoracion} Me gusta</span>
          </div>

          <button className='btn btn-primary mb-2' onClick={() => onViewMore(service)}>
            Ver más
          </button>
          <button className='btn btn-success' onClick={() => addToCart(service)} disabled={!isCart}>
            Agregar
          </button>
        </div>
      </div>
    </>
  )
}

export default ServiceCard
