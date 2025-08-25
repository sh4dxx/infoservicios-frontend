import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})

const success = {
  message: (title, text = '') =>
    Toast.fire({
      icon: 'success',
      title,
      text
    })
}

const error = {
  message: (title, text = '') =>
    Toast.fire({
      icon: 'error',
      title,
      text
    })
}

const warning = {
  message: (title, text = '') =>
    Toast.fire({
      icon: 'warning',
      title,
      text
    })
}

export { success, error, warning }
