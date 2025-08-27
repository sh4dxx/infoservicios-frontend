import { useContext, useMemo, useRef, useState } from 'react'
import { useModal } from '../../hooks/useModal' // tu hook
import ModalShell from '../../components/ModalShell'
import CreateWorker from './CreateWorker'
import EditWorker from './EditWorker'
import ShowWorker from './ShowWorker'
import { CartContext } from '../../context/CartContext'

// --- datos iniciales (tu lista completa) ---
const PERSONAS = [
  { id: 1, correo: 'jardinplus@servicios.cl', password: 'JardinP@ss123', nombre: 'Luis_Gallardo', ap_paterno: 'Gallardo', ap_materno: 'Muñoz', rut: '15.234.678-9', telefono: '+56 9 8123 4567', activo: true, rol_id: 2 },
  { id: 2, correo: 'hogarfix@servicios.cl', password: 'HogarFix2025!', nombre: 'Marcela_Rojas', ap_paterno: 'Rojas', ap_materno: 'Pérez', rut: '18.456.789-0', telefono: '+56 9 9234 5678', activo: true, rol_id: 2 },
  { id: 3, correo: 'mecanicarapida@servicios.cl', password: 'Mec@nicaR2025', nombre: 'Carlos_Morales', ap_paterno: 'Morales', ap_materno: 'Soto', rut: '12.345.678-5', telefono: '+56 9 8345 6789', activo: true, rol_id: 2 },
  { id: 4, correo: 'electroexpert@servicios.cl', password: 'ElectroXpert#2025', nombre: 'Ana_Fuentes', ap_paterno: 'Fuentes', ap_materno: 'Lagos', rut: '17.890.123-4', telefono: '+56 9 7456 7890', activo: true, rol_id: 2 },
  { id: 5, correo: 'carpinteriaartesanal@servicios.cl', password: 'Carp1nter@2025', nombre: 'Jorge_Sepúlveda', ap_paterno: 'Sepúlveda', ap_materno: 'Araya', rut: '13.567.890-1', telefono: '+56 9 6567 8901', activo: true, rol_id: 2 },
  { id: 6, correo: 'cliente.jardinero@correo.cl', password: 'ClienteJardin2025', nombre: 'Valentina_Castro', ap_paterno: 'Castro', ap_materno: 'Reyes', rut: '20.123.456-7', telefono: '+56 9 9012 3456', activo: true, rol_id: 3 },
  { id: 7, correo: 'cliente.mecanico@correo.cl', password: 'ClienteMec2025', nombre: 'Sebastián_Palma', ap_paterno: 'Palma', ap_materno: 'González', rut: '21.234.567-8', telefono: '+56 9 9123 4567', activo: true, rol_id: 3 },
  { id: 8, correo: 'cliente.hogar@correo.cl', password: 'ClienteHogar2025', nombre: 'Camila_Silva', ap_paterno: 'Silva', ap_materno: 'Torres', rut: '22.345.678-9', telefono: '+56 9 9234 5678', activo: true, rol_id: 3 },
  { id: 9, correo: 'prueba@test.cl', password: '$2b$10$0Cgm4Tfj0zKlaROcPObA6OB1/5xz6TB3I.n5c/kHid/6CoX5f/Hiq', nombre: 'Juanito', ap_paterno: 'Perez', ap_materno: 'Gonzales', rut: '20365710-2', telefono: '+56912345678', activo: true, rol_id: 2 },
  { id: 10, correo: 'tom@tom.cl', password: '$2b$10$vwgsW3ubMHiSlX13/3Kh/uttfHjYxOt10YiUfGzqAqQAdL/1cgkdK', nombre: 'Tomas', ap_paterno: 'Miau', ap_materno: 'Miau', rut: '15503803-9', telefono: '+56912345678', activo: true, rol_id: 2 },
  { id: 12, correo: 'ffh@gmail.com', password: '$2b$10$EpYhe8sEehG57JwJ/WDsh.rjgWrBA7sBERw194gg.1DR2p8Ky1UZa', nombre: 'Felipe', ap_paterno: 'H', ap_materno: 'H', rut: '76494210-8', telefono: '+56971229025', activo: true, rol_id: 2 },
  { id: 14, correo: 'pipe@test.cl', password: '$2b$10$vwgsW3ubMHiSlX13/3Kh/uttfHjYxOt10YiUfGzqAqQAdL/1cgkdK', nombre: 'Felipe', ap_paterno: 'Developer', ap_materno: '', rut: '20365710-3', telefono: '+56971229025', activo: true, rol_id: 1 }
]

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
  const initialWorkers = useMemo(() => PERSONAS.filter((p) => p.rol_id === 2), [])
  const [workers, setWorkers] = useState(initialWorkers)
  const [services, setServices] = useState(INIT_SERVICES)
  const [selected, setSelected] = useState(null)
  const { numFormat } = useContext(CartContext)

  // modales controlados por hook
  const createM = useModal(false)
  const editM = useModal(false)
  const showM = useModal(false)

  const fullName = (w) => `${w.nombre ?? ''} ${w.ap_paterno ?? ''} ${w.ap_materno ?? ''}`.replace(/\s+/g, ' ')

  // CRUD handlers
  const handleCreate = (workerData, serviceDrafts) => {
    const nextWorkerId = (Math.max(0, ...workers.map(w => w.id)) || 0) + 1
    const newWorker = { id: nextWorkerId, password: '', rol_id: 2, ...workerData }
    const nextServiceIdBase = (Math.max(0, ...services.map(s => s.id)) || 0) + 1
    const newServices = (serviceDrafts || []).map((sd, i) => ({
      id: nextServiceIdBase + i,
      trabajador_id: nextWorkerId,
      activo: true,
      categoria_id: Number(sd.categoria_id || 1),
      precio: Number(sd.precio || 0),
      foto: sd.foto || 'https://via.placeholder.com/640x400',
      ...sd
    }))

    setWorkers(prev => [newWorker, ...prev])
    if (newServices.length) setServices(prev => [...newServices, ...prev])
    createM.close()
  }

  const handleEdit = (updatedWorker, newServices = []) => {
    setWorkers(prev => prev.map(w => (w.id === updatedWorker.id ? updatedWorker : w)))
    if (newServices.length) {
      const nextServiceId = (Math.max(0, ...services.map(s => s.id)) || 0) + 1
      const toInsert = newServices.map((sd, i) => ({
        id: nextServiceId + i,
        trabajador_id: updatedWorker.id,
        activo: true,
        categoria_id: Number(sd.categoria_id || 1),
        precio: Number(sd.precio || 0),
        foto: sd.foto || 'https://via.placeholder.com/640x400',
        ...sd
      }))
      setServices(prev => [...toInsert, ...prev])
    }
    editM.close()
  }

  return (
    <>
      <div className='container'>
        <div className='card shadow-sm'>
          <div className='card-header d-flex align-items-center'>
            <h5 className='mb-0'>Trabajadores</h5>
            <button className='btn btn-success btn-sm ms-auto' onClick={createM.open}>
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

        {/* MODALES (controlados con useModal) */}
        <ModalShell isOpen={createM.isOpen} onClose={createM.close} title='Registrar trabajador'>
          <CreateWorker onCreate={handleCreate} onCancel={createM.close} />
        </ModalShell>

        <ModalShell isOpen={editM.isOpen} onClose={editM.close} title='Editar trabajador'>
          <EditWorker worker={selected} onEdit={handleEdit} onCancel={editM.close} />
        </ModalShell>

        <ModalShell isOpen={showM.isOpen} onClose={showM.close} title='Detalle del trabajador'>
          <ShowWorker
            worker={selected}
            services={selected ? services.filter(s => s.trabajador_id === selected.id) : []}
          />
        </ModalShell>
      </div>
    </>
  )
}

export default IndexWorker
