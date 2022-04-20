import axios from "axios";
import Swal from "sweetalert2";

const btnEliminar = document.querySelector("#eliminar-proyecto");

btnEliminar?.addEventListener("click", (e) => {
  const urlProyecto = e.target.dataset.proyectoUrl;
  deleleAlert().then((result) => {
    if (!result.isConfirmed) return;
    const url = `${location.origin}/proyectos/${urlProyecto}`;
    axios
      .delete(url, { params: urlProyecto })
      .then((res) => {
        console.log(res);
        deleteSuccessAlert();
        redirect();
      })
      .catch(() => deleteFailAlert());
  });
});

function deleleAlert() {
  return Swal.fire({
    title: "Deseas borrar este proyecto?",
    text: "Un proyecto eliminado no se puede recuperar",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borrar",
    cancelButtonText: "No, cancelar",
  });
}

function deleteSuccessAlert() {
  return Swal.fire("Proyecto eliminado", "El proyecto se ha eliminado.", "success");
}

function deleteFailAlert() {
  return Swal.fire("Hubo un error", "No se pudo eliminar el proyecto", "error");
}

function redirect(config = { url: "/", time: 0 }) {
  const { url, time } = config ?? {};
  if (url == null || time == null) return;
  setTimeout(() => {
    window.location.href = url;
  }, time);
}
