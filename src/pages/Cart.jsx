const Cart = () => {
  const items = [{ id: 1, name: 'Lavado de alfombra', price: 5000, qty: 3 }]

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)

  return (
    <div className='container my-5'>
      <h2>Carrito</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Item</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr key={i.id}>
              <td>{i.name}</td>
              <td>${i.price}</td>
              <td>
                <button className='btn btn-sm btn-secondary me-2'>-</button>
                {i.qty}
                <button className='btn btn-sm btn-secondary ms-2'>+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4 className='text-end'>Total: ${total}</h4>
      <button className='btn btn-primary'>Contratar</button>
    </div>
  )
}
export default Cart
