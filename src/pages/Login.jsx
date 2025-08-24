import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
    navigate('/')
  }

  return (
    <>
      <div className='d-flex justify-content-center align-items-center' style={{ height: '80vh' }}>
        <div className='card p-4 shadow' style={{ width: '22rem' }}>
          <h3 className='text-center mb-3'>Login</h3>
          <form onSubmit={handleSubmit}>
            <input type='email' className='form-control mb-2' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' className='form-control mb-3' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='btn btn-primary w-100'>Ingresar</button>
          </form>
          <small className='text-center mt-3'>
            <a href='#'>Recupera tu contraseña</a>
          </small>
        </div>
      </div>
    </>
  )
}

export default Login
