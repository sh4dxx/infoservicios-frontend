import { useState, useEffect } from 'react'
import api from '../config/api'
import ServiceCard from '../components/home/ServiceCard'
import ServiceModal from '../components/home/ServiceModal'
import { useModal } from '../hooks/useModal'

const Home = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedService, setSelectedService] = useState(null)
  const { isOpen, open, close } = useModal()

  useEffect(() => {
    api.get('/servicios')
      .then((res) => setServices(res.data))
      .catch((err) => {
        console.error('Error cargando servicios:', err)
        setError('No se pudieron cargar los servicios.')
      })
      .finally(() => setLoading(false))
  }, [])

  const handleViewMore = (service) => {
    setSelectedService(service)
    open()
  }

  // const handleClose = () => {
  //     setSelectedService(null)
  //     setShowModal(false)
  // }

  const addToCart = (service) => {
    console.log('Agregado al carrito:', service)
  }

  if (loading) return <div className='text-center my-5'>Cargando servicios...</div>
  if (error) return <div className='alert alert-danger text-center my-5'>{error}</div>

  return (
    <>
      <div className='container my-5'>
        <h2 className='text-center mb-4'>¡Bienvenidos!</h2>
        <p className='text-center text-muted'>Ofrecemos múltiples servicios a la puerta de su casa...</p>

        <div className='row'>
          {services.map((service) => (
            <div key={service.id} className='col-md-4 col-lg-3 mb-4'>
              <ServiceCard service={service} addToCart={() => console.log('Agregado:', service)} onViewMore={handleViewMore} />
            </div>
          ))}
        </div>

        {/* Modal */}
        <ServiceModal show={isOpen} onClose={close} service={selectedService} />
      </div>
    </>
  )
}

export default Home
