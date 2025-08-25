import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Login = () => {
  const { email, handleChangeEmail } = useContext(UserContext)
  const { password, handleChangePassword } = useContext(UserContext)
  const { handleSubmitLogin } = useContext(UserContext)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email === '') {
      alert('campo email es obligatorio')
    }

    if (password === '') {
      alert('campo password es obligatorio')
      return
    }

    if (password.length > 6) {
      alert('campo password es mayor a 6')
      return
    }

    handleSubmitLogin()
    handleChangeEmail('')
    handleChangePassword('')
  }

  return (
    <>
      {/* <div className='d-flex justify-content-center align-items-center' style={{ height: '80vh' }}> */}
      <div className='d-flex justify-content-center align-items-center mt-5 mb-5'>
        <div className='card p-4 shadow' style={{ width: '22rem' }}>
          <h3 className='text-center mb-3'>Login</h3>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              className='form-control mb-2'
              placeholder='Email'
              value={email}
              onChange={(e) => handleChangeEmail(e.target.value)}
            />
            <input
              type='password'
              className='form-control mb-3'
              placeholder='Password'
              value={password}
              onChange={(e) => handleChangePassword(e.target.value)}
            />
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
