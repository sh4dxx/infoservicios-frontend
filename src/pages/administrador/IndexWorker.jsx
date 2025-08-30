import { useContext, useMemo, useState, useEffect } from 'react'
import alert from '../../utils/alert'
import api from '../../config/api'
import { useLoading } from '../../hooks/useLoading'
import { useModal } from '../../hooks/useModal' // tu hook
import ModalShell from '../../components/ModalShell'
import CreateWorker from './CreateWorker'
import EditWorker from './EditWorker'
import ShowWorker from './ShowWorker'
import { CartContext } from '../../context/CartContext'

// servicios “DB” local (solo para demo)
const INIT_SERVICES = [
  {
    titulo: '',
    descripcion: '',
    detalle: '',
    precio: 0,
    foto: '',
    activo: true,
    trabajador_id: 0,
    categoria_id: 0
  }
]

function IndexWorker () {
  // const [hideLoading, showLoading] = useLoading()
  const [workers, setWorkers] = useState([])
  const [services, setServices] = useState(INIT_SERVICES)
  const [categorias, setCategorias] = useState([])
  const [selected, setSelected] = useState(null)
  const { numFormat } = useContext(CartContext)

  useEffect(() => {
    api.get('/categorias')
      .then((res) => setCategorias(res.data))
      .catch((err) => {
        console.error('Error cargando categorias:', err)
      })
  }, [])

  useEffect(() => {
    api.get('/admin/admin/personas/trabajadores')
      .then((res) => {
        console.log(res.data.results)
        setWorkers(res.data.results)
      })
      .catch((err) => {
        console.error('Error cargando servicios:', err)
        alert.message('error', 'No se pudieron cargar los trabajadores.')
      })
  }, [])

  // modales controlados por hook
  const createModal = useModal(false)
  const editM = useModal(false)
  const showM = useModal(false)

  const fullName = (text) => `${text.nombre ?? ''} ${text.ap_paterno ?? ''} ${text.ap_materno ?? ''}`.replace(/\s+/g, ' ')

  // CRUD handlers
  const handleCreate = async (workerData, serviceDrafts) => {
    const nextWorkerId = (Math.max(0, ...workers.map(w => w.id)) || 0) + 1
    const newWorker = { id: nextWorkerId, password: '', rol_id: 2, ...workerData }

    const newServices = (serviceDrafts || []).map((sd, i) => ({
      titulo: sd.titulo || '',
      descripcion: sd.descripcion || '',
      detalle: sd.detalle || '',
      precio: Number(sd.precio || 0),
      foto: sd.foto || '',
      activo: true,
      trabajador_id: nextWorkerId,
      categoria_id: Number(sd.categoria_id || 1),
      ...sd
    }))

    workerData.servicios = newServices
    console.log(newServices)
    const newPersona = await api.post('admin/admin/personas/trabajadores', workerData)
    console.log(newPersona)

    setWorkers(prev => [newWorker, ...prev])
    if (newServices.length) setServices(prev => [...newServices, ...prev])
    createModal.close()
  }

  const handleEdit = async (updatedWorker, newServices = []) => {
    console.log('Editando trabajador ', updatedWorker)
    updatedWorker.servicios = newServices

    setWorkers(prev => prev.map(w => (w.id === updatedWorker.id ? updatedWorker : w)))
    const toInsert = newServices.map((sd, i) => ({
      titulo: sd.titulo || '',
      descripcion: sd.descripcion || '',
      detalle: sd.detalle || '',
      precio: Number(sd.precio || 0),
      foto: sd.foto || '',
      activo: true,
      trabajador_id: updatedWorker.id,
      categoria_id: Number(sd.categoria_id || 1),
      ...sd
    }))
    setServices(prev => [...toInsert, ...prev])

    updatedWorker.servicios = toInsert
    console.log(updatedWorker)
    const newPersona = await api.put(`personas/trabajadores/${updatedWorker.id}`, updatedWorker)
    console.log(newPersona)

    editM.close()
  }

  return (
    <>
      <div className='container'>
        <div className='card shadow-sm'>
          <div className='card-header d-flex align-items-center'>
            <h5 className='mb-0'>Trabajadores</h5>
            <button className='btn btn-success btn-sm ms-auto' onClick={createModal.open}>
              <i className='fa-solid fa-user-plus me-1' />
              Registrar trabajador
            </button>
          </div>

          <div className='card-body'>
            <div className='table-responsive'>
              <table className='table'>
                <thead className=''>
                  <tr>
                    <th>Nombre</th>
                    <th>RUT</th>
                    <th>Correo</th>
                    <th>Teléfono</th>
                    <th>Activo</th>
                    <th style={{ width: 200 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {workers.length === 0
                    ? (
                      <tr>
                        <td colSpan={6} className='text-center text-muted py-4'>Sin trabajadores</td>
                      </tr>
                      )
                    : (
                        workers.map((w) => (
                          <tr key={w.id}>
                            <td className='fw-semibold'>{fullName(w)}</td>
                            <td>{w.rut}</td>
                            <td><a href={`mailto:${w.correo}`}>{w.correo}</a></td>
                            <td><a href={`tel:${w.telefono}`}>{w.telefono}</a></td>
                            <td>
                              <span className={`badge ${w.activo ? 'bg-success' : 'bg-secondary'}`}>
                                {w.activo ? 'Activo' : 'Inactivo'}
                              </span>
                            </td>
                            <td>
                              <div className='btn-group btn-group-sm'>
                                <button
                                  className='btn btn-outline-primary'
                                  onClick={() => { setSelected(w); showM.open() }}
                                >
                                  <i className='fa-regular fa-eye' /> Ver
                                </button>
                                <button
                                  className='btn btn-outline-secondary'
                                  onClick={() => { setSelected({ ...w }); editM.open() }}
                                >
                                  <i className='fa-regular fa-pen-to-square' /> Editar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                </tbody>
              </table>
            </div>

            <div className='text-muted small mt-2'>
              Total servicios: <strong>{services.length}</strong> · Monto ref.:{' '}
              <strong>
                ${numFormat(services.reduce((a, b) => a + (b.precio || 0), 0))}
              </strong>
            </div>
          </div>
        </div>

        <ModalShell isOpen={createModal.isOpen} onClose={createModal.close} title='Registrar trabajador'>
          <CreateWorker onCreate={handleCreate} onCancel={createModal.close} categorias={categorias} />
        </ModalShell>

        <ModalShell isOpen={editM.isOpen} onClose={editM.close} title='Editar trabajador'>
          <EditWorker
            worker={selected} onEdit={handleEdit}
            onCancel={editM.close}
            categorias={categorias}
          />
        </ModalShell>

        <ModalShell isOpen={showM.isOpen} onClose={showM.close} title='Detalle del trabajador'>
          <ShowWorker
            worker={selected} services={selected ? services.filter(s => s.trabajador_id === selected.id) : []}
          />
        </ModalShell>
      </div>
    </>
  )
}

export default IndexWorker
