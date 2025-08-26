import { useContext, useState, useMemo, useEffect } from 'react'

import { UserContext } from '../../context/UserContext'
import EditAcount from '../../components/EditAcount'
import ShowContract from './ShowContractCustomer'

const CustomerProfile = () => {
  const { user } = useContext(UserContext)
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
        { key: 'servicios', label: 'Servicios', icon: 'bi bi-wrench' },
        { key: 'clientes', label: 'Clientes', icon: 'bi bi-people' }
      ]
    }
  }, [])

  const role =
    user.rol_id === 1 ? 'administrador' : user.rol_id === 2 ? 'cliente' : 'trabajador'

  const menu = menuByRole[role] ?? []
  const [active, setActive] = useState(menu[0]?.key ?? null)

  // Grupo único estilo “Dashboards”
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
      if (active === 'mis-contratos') return <ShowContract />
    }
    // if (role === 'trabajador') {
    //   if (active === 'editar') return <EditAcount />
    //   if (active === 'mis-contratos') return <VistaTrabajadorContratos />
    //   if (active === 'mis-clientes') return <VistaTrabajadorClientes />
    // }
    // if (role === 'administrador') {
    //   if (active === 'trabajadores') return <VistaAdminTrabajadores />
    //   if (active === 'servicios') return <VistaAdminServicios />
    //   if (active === 'clientes') return <VistaAdminClientes />
    // }
    return <div className='text-muted'>Selecciona una opción del menú.</div>
  }

  return (
    <>
      {/* --- estilos del sidebar oscuro --- */}
      <style>{`
        .sidebar {
          background:#1f2735; color:#c9d1e3; border-radius:.75rem;
        }
        .sidebar .section-title{
          font-size:.75rem; letter-spacing:.08em; color:#8c99b2;
        }
        .sidebar .user{ color:#b8c2d8; }
        .sidebar .nav-link{
          color:#c9d1e3; border-radius:.5rem; padding:.55rem .75rem;
          display:flex; align-items:center; gap:.65rem;
        }
        .sidebar .nav-link:hover{ background:#293246; color:#fff; }
        .sidebar .nav-link.active{
          background:#33405a; color:#fff; box-shadow:inset 0 0 0 1px rgba(255,255,255,.06);
        }
        .sidebar .submenu .nav-link{ padding-left:2.25rem; color:#9fb0cf; }
        .sidebar .submenu .nav-link.active{ color:#fff; background:#2d3950; }
        .sidebar .caret{ margin-left:auto; transition: transform .2s ease; }
      `}
      </style>

      <div className='container-fluid py-4' style={{ minHeight: '80vh' }}>
        <div className='row'>

          {/* ASIDE */}
          <div className='col-12 col-md-3 col-lg-2 mb-3 mb-md-0'>
            <aside className='sidebar h-100 p-3 shadow-sm'>

              {/* Usuario */}
              <div className='d-flex align-items-center gap-2 mb-3'>
                <i className='bi bi-person-circle fs-1 user' />
                <div>
                  <div className='fw-semibold'>
                    {`${user.nombre} ${user.ap_paterno ?? ''} ${user.ap_materno ?? ''}`}
                  </div>
                  <div className='text-uppercase small user'>
                    <i className='bi bi-caret-right-fill me-1' /> {role}
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

                      {/* Encabezado del grupo */}
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

                      {/* Submenú */}
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
