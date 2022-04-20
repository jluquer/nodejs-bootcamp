export function actualizarAvance() {
  const tareas = document.querySelectorAll("li.tarea");
  if (tareas && tareas.length) {
    const tareasCompletas = document.querySelectorAll("i.completo");
    const barraAvance = document.querySelector("#barra-avance");
    const porcentaje = document.querySelector("#porcentaje");
    const avance = Math.round((tareasCompletas.length / tareas.length) * 100);
    porcentaje.style.width = avance + "%";
  }
}
