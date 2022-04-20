import axios from "axios";

const tareas = document.querySelector(".listado-pendientes");

tareas?.addEventListener("click", (e) => {
  const elClicked = e?.target;
  const classList = elClicked.classList;
  if (!elClicked) return;

  if (classList.contains("fa-check-circle")) {
    const idTarea = elClicked.parentElement?.parentElement?.dataset?.tarea;
    const url = `${location.origin}/tareas/${idTarea}`;
    axios.patch(url, { idTarea }).then((res) => {
      if (res.status === 200) {
        classList.toggle('completo')
      }
      console.log(res, "res");
    });
  }
});

export default tareas;
