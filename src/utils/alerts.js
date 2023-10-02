import Swal from "sweetalert2";

export function launchAlert(title, message, icon) {
    Swal.fire(title, message, icon)
}