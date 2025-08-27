import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { CartContext } from '../../context/CartContext'

const Navigation = () => {
  const navigate = useNavigate()
  const { user, userToken, handleLogout } = useContext(UserContext)
  const { total, numFormat, clearCart } = useContext(CartContext)

  const handleLogoutClick = () => {
    handleLogout()
    clearCart()
    navigate('/')
  }

  const showLogin = userToken ? 'btn global-color btn-blight' : 'd-none'
  const showLogout = !userToken ? 'btn global-color btn-blight' : 'd-none'
  const showCart = user.rol_id === 1 ? 'd-none' : 'btn btn-primary btn-bprymary'

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark global-color shadow-sm'>
        <div className='container py-2'>
          <Link to='/' className='navbar-brand ms-2'>INFO SERVICIOS</Link>

          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon' />
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <Link to='/' className='btn global-color btn-blight'>
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
                <button className={showLogin} onClick={handleLogoutClick}>Logout</button>
              </li>
            </ul>
            <Link to='/cart' className={showCart}>
              🛒 ${numFormat(total)}
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navigation
