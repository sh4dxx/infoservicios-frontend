import { Row, Col, Form, Button, Card } from 'react-bootstrap'

const Register = () => {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center mt-5 mb-5'>
        <Card className='p-4 shadow-lg' style={{ maxWidth: '800px', width: '100%' }}>
          <Card.Body>
            <h3 className=' mb-4'>Registro</h3>
            <hr />
            <Form>
              <Row className='mb-3'>
                <Col md={6}>
                  <Form.Group controlId='nombre'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type='text' placeholder='Ej: Ana' />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId='ap_paterno'>
                    <Form.Label>Apellido Paterno</Form.Label>
                    <Form.Control type='text' placeholder='Ej: Fuentes' />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col md={6}>
                  <Form.Group controlId='ap_materno'>
                    <Form.Label>Apellido Materno</Form.Label>
                    <Form.Control type='text' placeholder='Ej: Lagos' />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId='correo'>
                    <Form.Label>Correo</Form.Label>
                    <Form.Control type='email' placeholder='Ej: correo@dominio.com' />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col md={6}>
                  <Form.Group controlId='contrasena'>
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type='password' placeholder='********' />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId='rut'>
                    <Form.Label>RUT</Form.Label>
                    <Form.Control type='text' placeholder='17.890.123-4' />
                  </Form.Group>
                </Col>
              </Row>

              <Row className='mb-3'>
                <Col md={6}>
                  <Form.Group controlId='telefono'>
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type='text' placeholder='+56 9 7456 7890' />
                  </Form.Group>
                </Col>
              </Row>

            </Form>
          </Card.Body>
          <Card.Footer className='text-muted mt-3'>
            <div className='text-end mt-3'>
              <Button variant='primary' type='submit'>
                Registrarse
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </div>
    </>
  )
}

export default Register
