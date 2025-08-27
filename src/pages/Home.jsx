import { useState, useEffect, useContext } from 'react'
import api from '../config/api'
import ServiceCard from '../components/home/ServiceCard'
import ServiceModal from '../components/home/ServiceModal'
import { useModal } from '../hooks/useModal'
import { UserContext } from '../context/UserContext'

const Home = () => {
  const [error, setError] = useState(null)
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  // const [isCart, setIsCart] = useState(true)
  const [selectedService, setSelectedService] = useState(null)
  const { user } = useContext(UserContext)
  // if (user.rol_id === 1) setIsCart(false)

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

  if (loading) return <div className='text-center my-5'>Cargando servicios...</div>
  if (error) return <div className='alert alert-danger text-center my-5'>{error}</div>

  return (
    <>
      <div className='container my-5'>
        <h2 className='text-center mb-4'>¡Bienvenidos!</h2>
        <p className='text-center text-muted'>Ofrecemos múltiples servicios a la puerta de su casa...</p>

        <div className='my-5' />

        <div className='row'>
          {services.map((service) => (
            <div key={service.id} className='col-md-6 col-lg-4 col-xl-3 mb-4'>
              <ServiceCard service={service} onViewMore={handleViewMore} />
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
