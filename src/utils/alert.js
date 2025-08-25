import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true
})

const alert = {
  message: (type = 'info', title, text = '') => {
    return Toast.fire({
      icon: type, // "success" | "error" | "warning" | "info" | "question"
      title,
      text
    })
  }
}

export default alert
