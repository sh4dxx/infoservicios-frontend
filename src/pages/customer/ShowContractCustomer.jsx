const ShowContract = () => {
  const mockContratos = [
    {
      contrato: {
        id: 2,
        cliente_id: 9,
        total: 30000,
        finalizado: false,
        detalle: [
          {
            id: 3,
            cantidad: 1,
            precio_unitario: 30000,
            valoracion: 0,
            finalizado: false,
            servicio: {
              id: 5,
              titulo: 'Fabricación de Muebles a Medida',
              descripcion: 'Diseño y construcción de muebles personalizados.',
              detalle: 'Muebles de cocina, baño, oficina. Desde $30.000.',
              precio: 30000,
              foto: 'https://www.lascasasprefabricadas.com/wp-content/uploads/2017/09/muebles-cocina-madera-12.jpg',
              activo: true,
              categoria_id: 3,
              valoracion: 5,
              trabajor: {
                id: 8,
                correo: 'cliente.hogar@correo.cl',
                nombre: 'Camila_Silva',
                ap_paterno: 'Silva',
                ap_materno: 'Torres',
                rut: '22.345.678-9',
                telefono: '+56 9 9234 5678',
                activo: true
              }
            }
          }
        ]
      }
    },
    {
      contrato: {
        id: 2,
        cliente_id: 9,
        total: 60000,
        finalizado: false,
        detalle: [
          {
            id: 3,
            cantidad: 2,
            precio_unitario: 30000,
            valoracion: 0,
            finalizado: false,
            servicio: {
              id: 5,
              titulo: 'Fabricación de Muebles a Medida',
              descripcion: 'Diseño y construcción de muebles personalizados.',
              detalle: 'Muebles de cocina, baño, oficina. Desde $30.000.',
              precio: 30000,
              foto: 'https://img.multimap.es/wp-content/uploads/2023/07/instalar-sistema-riego.jpg',
              activo: true,
              categoria_id: 3,
              valoracion: 5,
              trabajor: {
                id: 8,
                correo: 'cliente.hogar@correo.cl',
                nombre: 'Camila_Silva',
                ap_paterno: 'Silva',
                ap_materno: 'Torres',
                rut: '22.345.678-9',
                telefono: '+56 9 9234 5678',
                activo: true
              }
            }
          },
          {
            id: 3,
            cantidad: 2,
            precio_unitario: 30000,
            valoracion: 0,
            finalizado: false,
            servicio: {
              id: 5,
              titulo: 'Fabricación de Muebles a Medida',
              descripcion: 'Diseño y construcción de muebles personalizados.',
              detalle: 'Muebles de cocina, baño, oficina. Desde $30.000.',
              precio: 30000,
              foto: 'https://img.multimap.es/wp-content/uploads/2023/07/instalar-sistema-riego.jpg',
              activo: true,
              categoria_id: 3,
              valoracion: 5,
              trabajor: {
                id: 8,
                correo: 'cliente.hogar@correo.cl',
                nombre: 'Camila_Silva',
                ap_paterno: 'Silva',
                ap_materno: 'Torres',
                rut: '22.345.678-9',
                telefono: '+56 9 9234 5678',
                activo: true
              }
            }
          }
        ]
      }
    }
  ]

  const datos = {}
  const contratos = datos.contratos ?? mockContratos

  return (
    <>
      <div className=''>
        {/* --- CSS del banner con desenfoque --- */}
        <style>{`
        .banner-blur {
          position: relative;
          height: 130px;                 /* altura de la franja */
          overflow: hidden;
          border-top-left-radius: .2rem;
          border-top-right-radius: .2rem;
        }
        .banner-blur::before {
          content: "";
          position: absolute;
          inset: -10px;                  /* un poco más grande para que el blur no muestre bordes */
          background-size: cover;
          background-position: center;
          filter: blur(2px) brightness(0.80);
          transform: scale(1.05);        /* evita bordes duros tras el blur */
        }
        .banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,0));
        }
        .mini-chip {
          font-size: .75rem;
          padding: .15rem .45rem;
          border-radius: .2rem;
          background: rgba(0,0,0,.55);
          color: #fff;
        }
      `}
        </style>
        <div className=' d-flex flex-column gap-4'>

          {contratos.map((c, idx) => {
            const contrato = c.contrato
            const det = contrato.detalle?.[0] // primer ítem del detalle
            const serv = det?.servicio
            const worker = serv?.trabajor
            const bannerUrl = serv?.foto

            return (
              <div key={idx} className='card shadow-sm '>
                {/* BANNER (franja superior con blur) */}
                <div
                  className='banner-blur'
                  style={{ '--bg': `url(${bannerUrl})` }}
                >
                  {/* Truco: inyectar la url en ::before */}
                  <style>{`.banner-blur:nth-of-type(${idx + 1})::before{background-image: var(--bg);}`}</style>
                  <div className='banner-overlay' />
                  <div className='position-absolute bottom-0 start-0 p-2'>
                    <span className='mini-chip'>{serv.titulo}</span>
                  </div>
                </div>

                {/* CONTENIDO */}
                <div className='card-body'>
                  <div className='row g-4'>
                    {/* Columna izquierda: Servicio / Contrato */}
                    <div className='col-12 col-lg-7'>
                      <h5 className='mb-3'>Contrato Nro°{serv.id}</h5>

                      <div className='d-flex align-items-start gap-3'>
                        <img
                          src={bannerUrl}
                          alt={serv.titulo}
                          className='rounded'
                          style={{ width: 90, height: 90, objectFit: 'cover' }}
                        />
                        <div>
                          <div className='fw-semibold'>{serv?.titulo}</div>
                          <div className='text-body-secondary small'>
                            {serv?.descripcion}
                          </div>
                          <div className='text-body-secondary small'>
                            {serv?.detalle}
                          </div>
                        </div>
                      </div>

                      <hr className='my-3' />

                      <div className='row gy-2 gx-3'>
                        <div className='col-6 col-md-4'>
                          <div className='text-uppercase text-body-secondary small'>
                            Cliente ID
                          </div>
                          <div className='fw-medium'>{contrato.cliente_id}</div>
                        </div>
                        <div className='col-6 col-md-4'>
                          <div className='text-uppercase text-body-secondary small'>
                            Cantidad
                          </div>
                          <div className='fw-medium'>{det?.cantidad}</div>
                        </div>
                        <div className='col-6 col-md-4'>
                          <div className='text-uppercase text-body-secondary small'>
                            Precio unitario
                          </div>
                          <div className='fw-medium'>
                            ${det?.precio_unitario?.toLocaleString('es-CL')}
                          </div>
                        </div>
                        <div className='col-6 col-md-4'>
                          <div className='text-uppercase text-body-secondary small'>
                            Total
                          </div>
                          <div className='fw-bold'>
                            ${contrato.total?.toLocaleString('es-CL')}
                          </div>
                        </div>
                        <div className='col-6 col-md-4'>
                          <div className='text-uppercase text-body-secondary small'>
                            Estado
                          </div>
                          {contrato.finalizado
                            ? (
                              <span className='badge bg-success'>Finalizado</span>
                              )
                            : (
                              <span className='badge bg-warning text-dark'>
                                Activo
                              </span>
                              )}
                        </div>
                        <div className='col-6 col-md-4'>
                          <div className='text-uppercase text-body-secondary small'>
                            Valoración
                          </div>
                          <div className='fw-medium'>{det?.valoracion}</div>
                        </div>
                      </div>
                    </div>

                    {/* Columna derecha: Trabajador */}
                    <div className='col-12 col-lg-5'>
                      <h5 className='mb-3'>Trabajador</h5>
                      <div className='row gx-4 gy-3'>
                        <div className='col-12'>
                          <div className='text-uppercase text-body-secondary small'>
                            Nombre
                          </div>
                          <div className='fw-medium'>
                            {worker?.nombre} {worker?.ap_paterno} {worker?.ap_materno}
                          </div>
                        </div>
                        <div className='col-12 col-md-6'>
                          <div className='text-uppercase text-body-secondary small'>
                            Correo
                          </div>
                          <a href={`mailto:${worker?.correo}`} className='fw-medium'>
                            {worker?.correo}
                          </a>
                        </div>
                        <div className='col-12 col-md-6'>
                          <div className='text-uppercase text-body-secondary small'>
                            Teléfono
                          </div>
                          <a href={`tel:${worker?.telefono}`} className='fw-medium'>
                            {worker?.telefono}
                          </a>
                        </div>
                        <div className='col-12 col-md-6'>
                          <div className='text-uppercase text-body-secondary small'>
                            RUT
                          </div>
                          <div className='fw-medium'>{worker?.rut}</div>
                        </div>
                        <div className='col-12 col-md-6'>
                          <div className='text-uppercase text-body-secondary small'>
                            Estado
                          </div>
                          <span
                            className={`badge ${
                          worker?.activo ? 'bg-success' : 'bg-secondary'
                        }`}
                          >
                            {worker?.activo ? 'Habilitado' : 'Deshabilitado'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detalle (si hay más de un ítem) */}
                  {contrato.detalle?.length > 1 && (
                    <>
                      <hr />
                      <div className='mt-2'>
                        <h6 className='mb-3'>Otros servicios en este contrato</h6>
                        <div className='table-responsive'>
                          <table className='table table-sm table-borderless text-center'>
                            <thead className='table-light'>
                              <tr>
                                <th>ID Detalle</th>
                                <th>Servicio</th>
                                <th>Cant.</th>
                                <th>Precio Unitario</th>
                                <th>Finalizado</th>
                              </tr>
                            </thead>
                            <tbody>
                              {contrato.detalle.slice(1).map((d) => (
                                <tr key={d.id}>
                                  <td>{d.id}</td>
                                  <td>{d.servicio?.titulo}</td>
                                  <td>{d.cantidad}</td>
                                  <td>
                                    ${d.precio_unitario?.toLocaleString('es-CL')}
                                  </td>
                                  <td>
                                    {d.finalizado
                                      ? (
                                        <span className='badge bg-success'>Sí</span>
                                        )
                                      : (
                                        <span className='badge bg-danger'>No</span>
                                        )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ShowContract
