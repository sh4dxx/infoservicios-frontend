import { useContext } from 'react'
import { Context2 } from '../context/ExampleContext2'

const Contador = () => {
  const { increment, decrement, total } = useContext(Context2)
  return (
    <>
      <div className='card h-10'>
        <div className='card-header text-center bg-primary text-white' />
        <h5 className='card-title'>contador {total}</h5>
        <div className='card-body d-flex flex-column' />
        <button className='btn btn-primary mb-2' onClick={increment}>+</button>
        <button className='btn btn-warning mb-2' onClick={decrement}>-</button>
      </div>
    </>
  )
}

export default Contador
