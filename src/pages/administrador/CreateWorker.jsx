import { useState } from 'react'

function CreateWorker ({ onCreate, onCancel }) {
  const [person, setPerson] = useState({
    correo: '',
    nombre: '',
    ap_paterno: '',
    ap_materno: '',
    rut: '',
    telefono: '',
    activo: true
  })

  // Servicios opcionales 0..N
  const [rows, setRows] = useState([])
  const addRow = () => setRows(prev => [...prev, { titulo: '', descripcion: '', detalle: '', precio: '', foto: '', activo: true, categoria_id: 1 }])
  const removeRow = (i) => setRows(prev => prev.filter((_, idx) => idx !== i))
  const updateRow = (i, patch) => setRows(prev => prev.map((r, idx) => idx === i ? { ...r, ...patch } : r))

  const submit = (e) => {
    e.preventDefault()
    onCreate(person, rows)
  }

  return (
    <>
      <form onSubmit={submit}>
        <div className='row g-4'>
          <div className='col-12'>
            <h6 className='text-uppercase text-body-secondary small mb-2'>Datos del trabajador</h6>
            <div className='row g-3'>
              <div className='col-md-6'>
                <label className='form-label'><i className='fa-regular fa-envelope me-2' />Correo</label>
                <div className='input-group'>
                  <span className='input-group-text'><i className='fa-regular fa-envelope' /></span>
                  <input
                    type='email' className='form-control' value={person.correo}
                    onChange={e => setPerson({ ...person, correo: e.target.value })} required
                  />
                </div>
              </div>
              <div className='col-md-6'>
                <label className='form-label'><i className='fa-solid fa-phone me-2' />Teléfono</label>
                <div className='input-group'>
                  <span className='input-group-text'><i className='fa-solid fa-phone' /></span>
                  <input
                    className='form-control' value={person.telefono}
                    onChange={e => setPerson({ ...person, telefono: e.target.value })}
                  />
                </div>
              </div>
              <div className='col-md-4'>
                <label className='form-label'><i className='fa-regular fa-user me-2' />Nombre</label>
                <input
                  className='form-control' value={person.nombre}
                  onChange={e => setPerson({ ...person, nombre: e.target.value })} required
                />
              </div>
              <div className='col-md-4'>
                <label className='form-label'>Apellido paterno</label>
                <input
                  className='form-control' value={person.ap_paterno}
                  onChange={e => setPerson({ ...person, ap_paterno: e.target.value })} required
                />
              </div>
              <div className='col-md-4'>
                <label className='form-label'>Apellido materno</label>
                <input
                  className='form-control' value={person.ap_materno}
                  onChange={e => setPerson({ ...person, ap_materno: e.target.value })}
                />
              </div>
              <div className='col-md-6'>
                <label className='form-label'><i className='fa-regular fa-id-card me-2' />RUT</label>
                <input
                  className='form-control' value={person.rut}
                  onChange={e => setPerson({ ...person, rut: e.target.value })} required
                />
              </div>
              <div className='col-md-6 d-flex align-items-end'>
                <div className='form-check'>
                  <input
                    className='form-check-input' type='checkbox' id='cw-activo'
                    checked={person.activo} onChange={e => setPerson({ ...person, activo: e.target.checked })}
                  />
                  <label className='form-check-label' htmlFor='cw-activo'>Activo</label>
                </div>
              </div>
            </div>
          </div>

          <div className='col-12'>
            <div className='d-flex align-items-center mb-2'>
              <h6 className='text-uppercase text-body-secondary small mb-0'>Servicios (opcional)</h6>
              <button type='button' className='btn btn-sm btn-outline-primary ms-auto' onClick={addRow}>
                <i className='fa-solid fa-plus me-1' />Agregar servicio
              </button>
            </div>

            {rows.length === 0
              ? (
                <div className='text-muted small'>Puedes registrar el trabajador sin servicios y agregarlos después.</div>
                )
              : rows.map((r, i) => (
                <div key={i} className='border rounded-3 p-3 mb-3'>
                  <div className='row g-3'>
                    <div className='col-md-6'>
                      <label className='form-label'><i className='fa-regular fa-rectangle-list me-2' />Título</label>
                      <input
                        className='form-control' value={r.titulo}
                        onChange={e => updateRow(i, { titulo: e.target.value })} required
                      />
                    </div>
                    <div className='col-md-3'>
                      <label className='form-label'><i className='fa-solid fa-dollar-sign me-2' />Precio (CLP)</label>
                      <input
                        type='number' min='0' className='form-control' value={r.precio}
                        onChange={e => updateRow(i, { precio: e.target.value })} required
                      />
                    </div>
                    <div className='col-md-3'>
                      <label className='form-label'><i className='fa-solid fa-hashtag me-2' />Categoría ID</label>
                      <input
                        type='number' className='form-control' value={r.categoria_id}
                        onChange={e => updateRow(i, { categoria_id: e.target.value })}
                      />
                    </div>
                    <div className='col-12'>
                      <label className='form-label'>Descripción</label>
                      <input
                        className='form-control' value={r.descripcion}
                        onChange={e => updateRow(i, { descripcion: e.target.value })}
                      />
                    </div>
                    <div className='col-12'>
                      <label className='form-label'>Detalle</label>
                      <textarea
                        className='form-control' rows={2} value={r.detalle}
                        onChange={e => updateRow(i, { detalle: e.target.value })}
                      />
                    </div>
                    <div className='col-md-9'>
                      <label className='form-label'><i className='fa-regular fa-image me-2' />URL Foto</label>
                      <input
                        className='form-control' value={r.foto}
                        onChange={e => updateRow(i, { foto: e.target.value })}
                      />
                    </div>
                    <div className='col-md-3 d-flex align-items-end justify-content-between'>
                      <div className='form-check'>
                        <input
                          className='form-check-input' type='checkbox' id={`srv-act-${i}`}
                          checked={r.activo} onChange={e => updateRow(i, { activo: e.target.checked })}
                        />
                        <label className='form-check-label' htmlFor={`srv-act-${i}`}>Activo</label>
                      </div>
                      <button type='button' className='btn btn-outline-danger btn-sm' onClick={() => removeRow(i)}>
                        <i className='fa-regular fa-trash-can' /> Quitar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className='d-flex justify-content-end gap-2 mt-3'>
          <button type='button' className='btn btn-outline-secondary' onClick={onCancel}>Cancelar</button>
          <button type='submit' className='btn btn-success'>Guardar</button>
        </div>
      </form>
    </>
  )
}

export default CreateWorker
