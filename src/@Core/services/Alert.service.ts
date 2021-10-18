import Swal from 'sweetalert2'

export const AlertService = {
  success: (title: string) => {
    Swal.fire({
      title,
      icon: 'success',
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  },
  error: (title: string) => {
    Swal.fire({
      title,
      icon: 'error',
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  },
  confirm: async (title: string) => {
    return await Swal.fire({
      title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      return !!result.value;
    });
  }
}
