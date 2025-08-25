import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'

const CustomerShow = () => {
  const servicios = [
    { nombre: 'Limpieza de Casa', fecha: '2023-10-01', estado: 'Completado', monto: 50000 },
    { nombre: 'Reparación de Grifo', fecha: '2023-10-15', estado: 'Pendiente', monto: 20000 },
    { nombre: 'Instalación de Aire Acondicionado', fecha: '2023-11-05', estado: 'Completado', monto: 150000 }
  ]
  // const [service, setService] = useState([])
  const { user } = useContext(UserContext)
  console.log(user)

  const [showModal, setShowModal] = useState(false)
  // const [formData, setFormData] = useState(user || {})
  const [favoritos, setFavoritos] = useState([])

  if (!user) {
    return <p className='text-center text-muted'>Cargando datos del cliente...</p>
  }

  // actualizar datos en el modal
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // simula guardar cambios del cliente
  const handleSave = async () => {
    try {
      // ejemplo de update
      // const response = await api.put(`/clientes/${user.id}`, formData);
      setUser(formData) // actualizamos contexto
      setShowModal(false)
    } catch (error) {
      console.error('Error al actualizar cliente:', error)
    }
  }

  // marcar servicio como favorito
  const handleLike = (servicioId) => {
    setFavoritos((prev) =>
      prev.includes(servicioId)
        ? prev.filter((id) => id !== servicioId)
        : [...prev, servicioId]
    )
  }

  return (
    <>
      <div className='container my-5'>
        {/* Card con información del cliente */}
        <div className='card shadow-sm mb-4'>
          <div className='card-header bg-primary text-white d-flex justify-content-between align-items-center'>
            <h5 className='mb-0'>Información del Cliente</h5>
            <button className='btn btn-light btn-sm' onClick={() => setShowModal(true)}>
              Editar
            </button>
          </div>
          <div className='card-body'>
            <p><strong>Nombre:</strong> {user.nombre} {user.ap_paterno} {user.ap_materno}</p>
            <p><strong>Correo:</strong> {user.correo}</p>
            <p><strong>Teléfono:</strong> {user.telefono}</p>
            <p><strong>RUT:</strong> {user.rut}</p>
            <p>
              <strong>Estado:</strong>{' '}
              <span className={`badge ${user.activo ? 'bg-success' : 'bg-danger'}`}>
                {user.activo ? 'Activo' : 'Inactivo'}
              </span>
            </p>
            <p><strong>Rol:</strong> Cliente</p>
          </div>
        </div>

        {/* Tabla historial de servicios */}
        <div className='card shadow-sm'>
          <div className='card-header bg-secondary text-white'>
            <h5 className='mb-0'>Historial de Servicios</h5>
          </div>
          <div className='card-body p-0'>
            <table className='table mb-0'>
              <thead className='table-light'>
                <tr>
                  <th>Servicio</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Monto</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.length > 0
                  ? (
                      servicios.map((servicio) => (
                        <tr key={servicio.id}>
                          <td>{servicio.nombre}</td>
                          <td>{servicio.fecha}</td>
                          <td>{servicio.estado}</td>
                          <td>${servicio.monto}</td>
                          <td>
                            {servicio.estado === 'Completado' && (
                              <button
                                className={`btn btn-sm ${
                            favoritos.includes(servicio.id)
                              ? 'btn-success'
                              : 'btn-outline-success'
                          }`}
                                onClick={() => handleLike(servicio.id)}
                              >
                                👍
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )
                  : (
                    <tr>
                      <td colSpan='5' className='text-center text-muted'>
                        No hay servicios contratados.
                      </td>
                    </tr>
                    )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal editar cliente */}
        {showModal && (
          <div className='modal fade show d-block' tabIndex='-1'>
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title'>Editar Información</h5>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className='modal-body'>
                  <div className='mb-3'>
                    <label className='form-label'>Nombre</label>
                    <input
                      type='text'
                      className='form-control'
                      name='nombre'
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Correo</label>
                    <input
                      type='email'
                      className='form-control'
                      name='correo'
                      value={formData.correo}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label'>Teléfono</label>
                    <input
                      type='text'
                      className='form-control'
                      name='telefono'
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Se pueden agregar más campos aquí */}
                </div>
                <div className='modal-footer'>
                  <button className='btn btn-secondary' onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button className='btn btn-primary' onClick={handleSave}>
                    Guardar
                  </button>
                </div>
              </div>
            </div>
            <div className='modal-backdrop fade show' />
          </div>
        )}
      </div>
    </>
  )
}

export default CustomerShow
