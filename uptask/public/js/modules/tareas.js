const tareas = document.querySelector(".listado-pendientes");

tareas?.addEventListener("click", (e) => {
  const elClicked = e?.target;
  const classList = elClicked.classList;
  if (!elClicked) return;

  if (classList.contains("fa-check-circle")) {
    const idTarea = elClicked.parentElement?.parentElement?.dataset?.tarea;
    console.log(idTarea);
  }
});

export default tareas;
