import alert from '../utils/alert'
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useLoading } from '../hooks/useLoading'

const initialFormState = {
  correo: '',
  password: '',
  nombre: '',
  ap_paterno: '',
  ap_materno: '',
  rut: '',
  telefono: ''
}

const Register = () => {
  const navigate = useNavigate()
  const { handleSubmitRegister } = useContext(UserContext)
  const { showLoading, hideLoading } = useLoading()
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState(initialFormState)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    const newErrors = {}

    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es requerido'
    if (!form.ap_paterno.trim()) newErrors.ap_paterno = 'Apellido paterno es requerido'
    if (!form.ap_materno.trim()) newErrors.ap_materno = 'Apellido materno es requerido'

    if (!form.correo) newErrors.correo = 'Correo es requerido'
    else if (!/\S+@\S+\.\S+/.test(form.correo)) newErrors.correo = 'Correo inválido'

    if (!form.password) newErrors.password = 'Contraseña es requerida'
    else if (form.password.length < 6) newErrors.password = 'Mínimo 6 caracteres'

    if (!form.rut) newErrors.rut = 'El RUT es requerido'
    else if (!/^\d{1,2}\.?\d{3}\.?\d{3}-[\dkK]$/.test(form.rut)) newErrors.rut = 'Formato inválido (Ej: 17.890.123-4)'

    if (!form.telefono) newErrors.telefono = 'El teléfono es requerido'
    else if (!/^\+56\s?9\s?\d{4}\s?\d{4}$/.test(form.telefono)) newErrors.telefono = 'Formato inválido (+56 9 1234 5678)'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      showLoading()
      await handleSubmitRegister(form)
      alert.message('success', 'Usuario registrado con éxito ✅')
      setForm(initialFormState)
      setErrors({})

      navigate('/')
    } catch {
      alert.message('error', 'Error al registrar un cliente ❌')
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <div className='d-flex justify-content-center align-items-center mt-5 mb-5'>
        <Card className='p-4 shadow-lg' style={{ maxWidth: '800px', width: '100%' }}>
          <Card.Body>
            <h3 className='mb-2'>Registro</h3>
            <p className='text-muted'>Crea tu cuenta para acceder a nuestros servicios</p>
            <hr />

            <Form onSubmit={handleSubmit}>
              {/* Grupo Nombre y Apellidos */}
              <Row className='mb-3'>
                <Col md={4}>
                  <Form.Group controlId='nombre'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type='text'
                      name='nombre'
                      value={form.nombre}
                      onChange={handleChange}
                      isInvalid={!!errors.nombre}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.nombre}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId='ap_paterno'>
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control
                      type='text'
                      name='ap_paterno'
                      value={form.ap_paterno}
                      onChange={handleChange}
                      isInvalid={!!errors.ap_paterno}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.ap_paterno}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId='ap_materno'>
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control
                      type='text'
                      name='ap_materno'
                      value={form.ap_materno}
                      onChange={handleChange}
                      isInvalid={!!errors.ap_materno}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.ap_materno}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Grupo Correo y Contraseña */}
              <Row className='mb-3'>
                <Col md={6}>
                  <Form.Group controlId='correo'>
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                      type='email'
                      name='correo'
                      value={form.correo}
                      onChange={handleChange}
                      isInvalid={!!errors.correo}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.correo}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId='password'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type='password'
                      name='password'
                      value={form.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              {/* Grupo RUT y Teléfono */}
              <Row className='mb-3'>
                <Col md={6}>
                  <Form.Group controlId='rut'>
                    <Form.Label>RUT</Form.Label>
                    <Form.Control
                      type='text'
                      name='rut'
                      value={form.rut}
                      onChange={handleChange}
                      isInvalid={!!errors.rut}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.rut}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId='telefono'>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                      type='text'
                      name='telefono'
                      value={form.telefono}
                      onChange={handleChange}
                      isInvalid={!!errors.telefono}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.telefono}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <div className='text-end mt-4'>
                <Button variant='primary' type='submit'>
                  Registrarse
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default Register
