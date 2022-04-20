import axios from "axios";
import Swal from "sweetalert2";

const tareas = document.querySelector(".listado-pendientes");

tareas?.addEventListener("click", (e) => {
  const elClicked = e?.target;
  const classList = elClicked.classList;
  if (!elClicked) return;

  if (classList.contains("fa-check-circle")) {
    const idTarea = elClicked.parentElement?.parentElement?.dataset?.tarea;
    const url = `${location.origin}/tareas/${idTarea}`;
    axios.patch(url, { idTarea }).then((res) => {
      if (res.status === 200) classList.toggle("completo");
    });
  } else if (classList.contains("fa-trash")) {
    const elTarea = elClicked.parentElement?.parentElement;
    const idTarea = elTarea?.dataset?.tarea;
    const url = `${location.origin}/tareas/${idTarea}`;

    deleteAlert().then((result) => {
      if (result.isConfirmed)
        axios.delete(url, { idTarea }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            elTarea.remove();
            deleteSuccessAlert();
          } else {
            deleteFailAlert();
          }
        });
    });
  }
});

function deleteAlert() {
  return Swal.fire({
    title: "Deseas borrar esta tarea?",
    text: "Una tarea eliminada no se puede recuperar",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar",
    cancelButtonText: "No, cancelar",
  });
}

function deleteSuccessAlert() {
  return Swal.fire("Tarea eliminada", "La tarea se ha eliminado.", "success");
}

function deleteFailAlert() {
  return Swal.fire("Hubo un error", "No se pudo eliminar la tarea", "error");
}

export default tareas;
