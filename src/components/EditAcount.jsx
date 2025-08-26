import { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import { Card } from 'react-bootstrap'
const EditAcount = () => {
  const { user } = useContext(UserContext)

  const [form, setForm] = useState({
    nombre: user.nombre ?? '',
    email: user.email ?? '',
    telefono: user.telefono ?? ''
  })

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = (e) => {
    e.preventDefault()
    console.log('Guardar perfil', form)
    alert('Datos guardados (demo)')
  }
  return (
    <>
      <Card>
        <Card.Header>
          Editar cuenta
        </Card.Header>
        <Card.Body>
          <form onSubmit={onSubmit}>
            <div className='row g-3'>
              <div className='col-md-6'>
                <label className='form-label'>Nombre</label>
                <input className='form-control' name='nombre' value={form.nombre} onChange={onChange} />
              </div>
              <div className='col-md-6'>
                <label className='form-label'>Teléfono</label>
                <input className='form-control' name='telefono' value={form.telefono} onChange={onChange} />
              </div>
              <div className='col-12'>
                <label className='form-label'>Correo</label>
                <input className='form-control' type='email' name='email' value={form.email} onChange={onChange} />
              </div>
              <div className='col-12 d-flex gap-2 justify-content-end'>
                <button className='btn btn-primary' type='submit'>Guardar</button>
              </div>
            </div>
          </form>
        </Card.Body>
      </Card>
    </>
  )
}

export default EditAcount
