import { useEffect, useState } from 'react'

const EditWorker = ({ worker, onEdit, onCancel }) => {
  const [model, setModel] = useState(null)
  const [rows, setRows] = useState([])

  useEffect(() => {
    setModel(worker ? { ...worker } : null)
    setRows([])
  }, [worker])

  const addRow = () => setRows(prev => [...prev, { titulo: '', descripcion: '', detalle: '', precio: '', foto: '', activo: true, categoria_id: 1 }])
  const removeRow = (i) => setRows(prev => prev.filter((_, idx) => idx !== i))
  const updateRow = (i, patch) => setRows(prev => prev.map((r, idx) => idx === i ? { ...r, ...patch } : r))

  const submit = (e) => {
    e.preventDefault()
    if (!model) return
    onEdit(model, rows)
  }

  if (!model) return <div className='text-muted'>Sin selección</div>

  return (
    <form onSubmit={submit}>
      <div className='row g-4'>
        <div className='col-12'>
          <h6 className='text-uppercase text-body-secondary small mb-2'>Datos</h6>
          <div className='row g-3'>
            <div className='col-md-6'>
              <label className='form-label'>Correo (solo lectura)</label>
              <div className='input-group'>
                <span className='input-group-text'><i className='fa-regular fa-envelope' /></span>
                <input className='form-control' value={model.correo} disabled />
              </div>
            </div>
            <div className='col-md-6'>
              <label className='form-label'><i className='fa-solid fa-phone me-2' />Teléfono</label>
              <div className='input-group'>
                <span className='input-group-text'><i className='fa-solid fa-phone' /></span>
                <input
                  className='form-control' value={model.telefono}
                  onChange={e => setModel({ ...model, telefono: e.target.value })}
                />
              </div>
            </div>
            <div className='col-md-4'>
              <label className='form-label'><i className='fa-regular fa-user me-2' />Nombre</label>
              <input
                className='form-control' value={model.nombre}
                onChange={e => setModel({ ...model, nombre: e.target.value })}
              />
            </div>
            <div className='col-md-4'>
              <label className='form-label'>Apellido paterno</label>
              <input
                className='form-control' value={model.ap_paterno}
                onChange={e => setModel({ ...model, ap_paterno: e.target.value })}
              />
            </div>
            <div className='col-md-4'>
              <label className='form-label'>Apellido materno</label>
              <input
                className='form-control' value={model.ap_materno}
                onChange={e => setModel({ ...model, ap_materno: e.target.value })}
              />
            </div>
            <div className='col-md-6'>
              <label className='form-label'>RUT (solo lectura)</label>
              <div className='input-group'>
                <span className='input-group-text'><i className='fa-regular fa-id-card' /></span>
                <input className='form-control' value={model.rut} disabled />
              </div>
            </div>
            <div className='col-md-6 d-flex align-items-end'>
              <div className='form-check'>
                <input
                  className='form-check-input' type='checkbox' id='ew-activo'
                  checked={!!model.activo} onChange={e => setModel({ ...model, activo: e.target.checked })}
                />
                <label className='form-check-label' htmlFor='ew-activo'>Activo</label>
              </div>
            </div>
          </div>
        </div>

        {/* Agregar servicios nuevos (opcional) */}
        <div className='col-12'>
          <div className='d-flex align-items-center mb-2'>
            <h6 className='text-uppercase text-body-secondary small mb-0'>Agregar servicios (opcional)</h6>
            <button type='button' className='btn btn-sm btn-outline-primary ms-auto' onClick={addRow}>
              <i className='fa-solid fa-plus me-1' />Agregar
            </button>
          </div>

          {rows.length === 0
            ? (
              <div className='text-muted small'>Puedes guardar sin agregar servicios.</div>
              )
            : rows.map((r, i) => (
              <div key={i} className='border rounded-3 p-3 mb-3'>
                <div className='row g-3'>
                  <div className='col-md-6'>
                    <label className='form-label'>Título</label>
                    <input
                      className='form-control' value={r.titulo}
                      onChange={e => updateRow(i, { titulo: e.target.value })} required
                    />
                  </div>
                  <div className='col-md-3'>
                    <label className='form-label'>Precio (CLP)</label>
                    <input
                      type='number' min='0' className='form-control' value={r.precio}
                      onChange={e => updateRow(i, { precio: e.target.value })} required
                    />
                  </div>
                  <div className='col-md-3'>
                    <label className='form-label'>Categoría ID</label>
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
                    <label className='form-label'>URL Foto</label>
                    <input
                      className='form-control' value={r.foto}
                      onChange={e => updateRow(i, { foto: e.target.value })}
                    />
                  </div>
                  <div className='col-md-3 d-flex align-items-end justify-content-between'>
                    <div className='form-check'>
                      <input
                        className='form-check-input' type='checkbox' id={`nw-act-${i}`}
                        checked={r.activo} onChange={e => updateRow(i, { activo: e.target.checked })}
                      />
                      <label className='form-check-label' htmlFor={`nw-act-${i}`}>Activo</label>
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
        <button type='submit' className='btn btn-primary'>Guardar cambios</button>
      </div>
    </form>
  )
}

export default EditWorker
