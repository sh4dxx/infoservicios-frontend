import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark px-3'>
        <Link to='/' className='navbar-brand'>Info Servicios</Link>
        <div className='ms-auto'>
          {user
            ? (
              <>
                <Link to='/' className='btn btn-link text-light'>Home</Link>
                <Link to='/cart' className='btn btn-link text-light'>Carrito</Link>
                <button onClick={logout} className='btn btn-outline-light'>Logout</button>
              </>
              )
            : (
              <>
                <Link to='/login' className='btn btn-link text-light'>Login</Link>
                <Link to='/register' className='btn btn-link text-light'>Register</Link>
              </>
              )}
        </div>
      </nav>
    </>
  )
}

export default Navbar
