import React from 'react'

const ModalShell = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'modal-xl'
}) => {
  return (
    <>
      <div
        className={`modal fade modal-sheet ${isOpen ? 'show d-block' : ''}`}
        tabIndex='-1'
        aria-hidden={!isOpen}
        role='dialog'
      >
        <div className={`modal-dialog ${size} modal-dialog-centered modal-dialog-scrollable`}>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title sheet-title'>{title}</h5>
              <button className='btn-close' aria-label='Close' onClick={onClose} />
            </div>
            <div className='modal-body'>{children}</div>
            <div className='modal-footer'>
              {footer ?? (
                <button className='btn btn-outline-secondary' onClick={onClose}>
                  Cerrar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {isOpen && <div className='modal-backdrop fade show' onClick={onClose} />}
      <style>{`
        .modal-sheet .modal-content { border-radius: 16px; }
        .modal-sheet .modal-header { border-bottom: 1px dashed #e9ecef; }
        .modal-sheet .modal-footer { border-top: 1px dashed #e9ecef; }
        .sheet-title { font-weight: 600; }
      `}
      </style>
    </>
  )
}

export default ModalShell
