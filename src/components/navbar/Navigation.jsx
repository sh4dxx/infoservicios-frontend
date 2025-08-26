import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'

const Navigation = () => {
  const { userToken, handleLogout } = useContext(UserContext)
  const { total, numFormat } = useContext(CartContext)
  console.log('userToken => ' + userToken)

  const showLogin = userToken ? 'btn btn-dark btn-blight' : 'd-none'
  const showLogout = !userToken ? 'btn btn-dark btn-blight' : 'd-none'
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark text-white bg-dark'>
        <div className='container'>
          <Link to='/' className='navbar-brand ms-2'>Info Servicios</Link>

          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link to='/' className='btn btn-dark btn-blight'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/login' className={showLogout}>
                  Login
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/register' className={showLogout}>
                  Register
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/profile' className={showLogin}>
                  My Account
                </Link>
              </li>
              <li className='nav-item'>
                <button className={showLogin} onClick={handleLogout}>Logout</button>
              </li>
            </ul>
            <Link to='/cart' className='btn btn-primary btn-bprymary'>
              🛒 ${numFormat(total)}
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation
