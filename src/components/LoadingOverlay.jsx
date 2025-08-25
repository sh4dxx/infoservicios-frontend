import { useLoading } from '../hooks/useLoading'

const LoadingOverlay = () => {
  const { loading } = useLoading()
  return (
    <>
      {loading && (
        <div
          className='position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50'
          style={{ zIndex: 1050 }}
        >
          <div className='spinner-border text-light' role='status' style={{ width: '3rem', height: '3rem' }}>
            <span className='visually-hidden'>Cargando...</span>
          </div>
        </div>)}
    </>
  )
}

export default LoadingOverlay
