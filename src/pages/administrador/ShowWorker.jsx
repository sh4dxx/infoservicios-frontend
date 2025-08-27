const ShowWorker = ({ worker, services = [] }) => {
  if (!worker) return <div className='text-muted'>Sin selección</div>
  const fullName = (w) => `${w?.nombre ?? ''} ${w?.ap_paterno ?? ''} ${w?.ap_materno ?? ''}`.replace(/\s+/g, ' ')

  return (
    <>
      <div className='row g-3 mb-3'>
        <div className='col-md-4'>
          <div className='text-uppercase small text-body-secondary'>Nombre</div>
          <div className='fw-semibold'><i className='fa-regular fa-user me-2' /> {fullName(worker)}</div>
        </div>
        <div className='col-md-3'>
          <div className='text-uppercase small text-body-secondary'>RUT</div>
          <div><i className='fa-regular fa-id-card me-2' /> {worker.rut}</div>
        </div>
        <div className='col-md-3'>
          <div className='text-uppercase small text-body-secondary'>Teléfono</div>
          <a href={`tel:${worker.telefono}`}><i className='fa-solid fa-phone me-2' />{worker.telefono}</a>
        </div>
        <div className='col-md-2'>
          <div className='text-uppercase small text-body-secondary'>Estado</div>
          <span className={`badge ${worker.activo ? 'bg-success' : 'bg-secondary'}`}>
            {worker.activo ? 'Activo' : 'Inactivo'}
          </span>
        </div>
        <div className='col-md-6'>
          <div className='text-uppercase small text-body-secondary'>Correo</div>
          <a href={`mailto:${worker.correo}`}><i className='fa-regular fa-envelope me-2' />{worker.correo}</a>
        </div>
      </div>

      <hr className='my-3' />

      <h6 className='mb-3'>Servicios asociados</h6>
      <div className='table-responsive'>
        <table className='table table-sm align-middle'>
          <thead className='table-light'>
            <tr>
              <th>Título</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0
              ? (
                <tr>
                  <td colSpan={4} className='text-center text-muted'>Sin servicios</td>
                </tr>
                )
              : services.map(s => (
                <tr key={s.id}>
                  <td>{s.titulo}</td>
                  <td>${new Intl.NumberFormat('es-CL').format(s.precio || 0)}</td>
                  <td>{s.categoria_id}</td>
                  <td><span className={`badge ${s.activo ? 'bg-success' : 'bg-secondary'}`}>{s.activo ? 'Sí' : 'No'}</span></td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ShowWorker
