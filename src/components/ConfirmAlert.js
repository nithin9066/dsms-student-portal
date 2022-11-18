import Swal from "sweetalert2"

export const Confirm = (text='Delete', warn = "You won't be able to revert this!", callback) => Swal.fire({
    title: 'Are you sure?',
    text: `${warn}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'No',
    confirmButtonText: `Yes`,
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
        callback();
    }
  })
  