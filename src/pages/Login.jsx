import alert from '../utils/alert'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useLoading } from '../hooks/useLoading'

const Login = () => {
  const navigate = useNavigate()
  const { handleSubmitLogin } = useContext(UserContext)
  const { showLoading, hideLoading } = useLoading()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (!email) newErrors.email = 'El campo email es obligatorio'
    if (!password) newErrors.password = 'El campo contraseña es obligatorio'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    showLoading()

    try {
      await handleSubmitLogin(email, password)
      alert.message('success', 'Bienvenido')
      navigate('/profile')
    } catch {
      alert.message('error', 'Credenciales inválidas')
    } finally {
      hideLoading()
    }
  }

  return (
    <>
      <div className='d-flex justify-content-center align-items-center mt-5 mb-5'>
        <div className='card p-4 shadow' style={{ width: '22rem' }}>
          <h3 className='text-center mb-3'>Login</h3>
          <form onSubmit={handleSubmit}>
            <div className='mb-2'>
              <input
                type='email'
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <small className='text-danger'>{errors.email}</small>}
            </div>

            <div className='mb-3'>
              <input
                type='password'
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder='Contraseña'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <small className='text-danger'>{errors.password}</small>}
            </div>

            <button className='btn btn-primary w-100'>Ingresar</button>
          </form>

          <small className='text-center mt-3 d-block'>
            <a href='#'>Recupera tu contraseña</a>
          </small>
        </div>
      </div>
    </>
  )
}

export default Login
