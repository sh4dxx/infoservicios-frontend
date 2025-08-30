import api from '../../config/api'
import { useContext, useState, useMemo, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import EditAcount from '../../components/EditAcount'
import ShowContract from './ShowContractCustomer'
import IndexWorker from '../administrador/IndexWorker'

const CustomerProfile = () => {
  const { user, userToken } = useContext(UserContext)
  const [contratos, setContratos] = useState([])
  console.log('se renderizo perfil')
  console.log('usuario ' + user.id)

  const getContratos = async () => {
    try {
      const response = await api.get(`contratos/cliente/${user.id}`)
      setContratos(response.data)
    } catch (error) {
      console.error('Error cargando contratos:', error)
    }
  }

  // rol seguro
  const role =
  user?.rol_id === 1
    ? 'administrador'
    : user?.rol_id === 2
      ? 'cliente'
      : user?.rol_id === 3 ? 'trabajador' : 'guest'

  // cargar contratos solo cuando haya user.id y sea cliente
  useEffect(() => {
    if (role === 'cliente' && user?.id) {
      getContratos()
    }
  }, [role, user?.id])

  const menuByRole = useMemo(() => {
    return {
      cliente: [
        { key: 'editar', label: 'Editar cuenta', icon: 'bi bi-person' },
        { key: 'mis-contratos', label: 'Mis contratos', icon: 'bi bi-list-check' }
      ],
      trabajador: [
        { key: 'editar', label: 'Editar cuenta', icon: 'bi bi-person' },
        { key: 'mis-contratos', label: 'Mis contratos', icon: 'bi bi-briefcase' },
        { key: 'mis-clientes', label: 'Mis clientes', icon: 'bi bi-people' }
      ],
      administrador: [
        { key: 'trabajadores', label: 'Trabajadores', icon: 'bi bi-person-gear' },
        { key: 'servicios', label: 'Servicios', icon: 'bi bi-wrench' }
        // { key: 'clientes', label: 'Clientes', icon: 'bi bi-people' }
      ]
    }
  }, [])

  const menu = menuByRole[role] ?? []
  const [active, setActive] = useState(null)
  useEffect(() => {
    setActive(menu[0]?.key ?? null)
  }, [role]) // o [menu]

  const menuGroups = useMemo(
    () => [
      {
        key: 'grp-main',
        label: 'Dashboards',
        icon: 'bi bi-house',
        items: menu
      }
    ],
    [menu]
  )

  // Submenú abierto por defecto
  const [openKey, setOpenKey] = useState(menuGroups[0]?.key ?? '')
  useEffect(() => {
    setOpenKey(menuGroups[0]?.key ?? '')
    if (!active && menu[0]) setActive(menu[0].key)
  }, [menuGroups, menu, active])

  const renderContent = () => {
    if (role === 'cliente') {
      if (active === 'editar') return <EditAcount />
      if (active === 'mis-contratos') return <ShowContract contratos={contratos} />
    }
    if (role === 'trabajador') {
      if (active === 'mis-contratos') return <ShowContract contratos={contratos} />
    }
    if (role === 'administrador') {
      if (active === 'trabajadores') return <IndexWorker />
    }
    return <div className='text-muted'>Selecciona una opción del menú.</div>
  }

  return (
    <>

      <div className='container-fluid py-4' style={{ minHeight: '80vh' }}>
        <div className='row'>

          {/* ASIDE */}
          <div className='col-12 col-md-3 col-lg-2 mb-3 mb-md-0'>
            <aside className='sidebar p-3 shadow-sm'>

              {/* Usuario */}
              <div className='text-center' style={{ fontSize: '5rem', color: '#868686ff' }}>
                <i className='fa-regular fa-circle-user' />
              </div>
              <div className='d-flex align-items-center gap-2 mb-3'>

                <div>
                  <div className='fw-semibold'>
                    {`${user.nombre} ${user.ap_paterno ?? ''} ${user.ap_materno ?? ''}`}
                  </div>
                  <div className='text-uppercase small user'>
                    <i className='bi bi-caret-right-fill' />{role}
                  </div>
                </div>
              </div>

              <div className='section-title mb-2'>MENU</div>

              {/* Grupos (colapsables) */}
              <div className='nav flex-column'>
                {menuGroups.map((grp) => {
                  const isOpen = openKey === grp.key
                  return (
                    <div key={grp.key} className='mb-1'>

                      <button
                        type='button'
                        className='nav-link w-100'
                        onClick={() => setOpenKey(isOpen ? '' : grp.key)}
                        aria-expanded={isOpen}
                      >
                        <i className={`${grp.icon} opacity-75`} />
                        <span className='fw-semibold'>{grp.label}</span>
                        <i
                          className='bi bi-caret-up-fill caret ms-auto'
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        />
                      </button>

                      <div className={`collapse ${isOpen ? 'show' : ''}`}>
                        <div className='submenu ps-1'>
                          {grp.items.map((it) => (
                            <button
                              key={it.key}
                              type='button'
                              className={`nav-link w-100 ${active === it.key ? 'active' : ''}`}
                              onClick={() => setActive(it.key)}
                            >
                              <i className={`${it.icon} opacity-75`} />
                              <span className='small'>{it.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </aside>
          </div>

          {/* PANEL DE CONTENIDO */}
          <div className='col-12 col-md-9 col-lg-10'>
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default CustomerProfile
