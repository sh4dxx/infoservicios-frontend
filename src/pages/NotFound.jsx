import { Link } from 'react-router-dom'
const NotFound = () => {
  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '50vh' }}>

        <div className='alert alert-info' role='alert'>
          <h1>404 NOT FOUND</h1>
          <p>No fue posible encontrar la ruta seleccionada, pulse sobre el botón para volver al home.</p>
          <Link to='/' className='btn btn-dark btn-lg'>
            Home
          </Link>

        </div>
      </div>
    </>
  )
}

export default NotFound
