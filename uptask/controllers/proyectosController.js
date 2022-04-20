const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");

exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyecto.findAll();
  res.render("index", {
    nombrePagina: "Proyectos",
    proyectos,
  });
};

exports.formularioProyecto = async (req, res) => {
  const proyectos = await Proyecto.findAll();
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
    proyectos,
  });
};

exports.nuevoProyecto = async (req, res) => {
  try {
    const { nombre } = req.body;
    const proyectos = await Proyecto.findAll();
    const errores = [];
    if (!nombre) errores.push({ texto: "Agrega un nombre al proyecto" });
    if (errores.length > 0) {
      res.render("nuevoProyecto", {
        nombrePagina: "Nuevo Proyecto",
        errores,
        proyectos,
      });
      return;
    }
    await Proyecto.create({ nombre });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.proyectoPorUrl = async (req, res, next) => {
  const proyectos$ = Proyecto.findAll();
  const proyecto$ = Proyecto.findOne({ where: { url: req.params.url } });
  const [proyectos, proyecto] = await Promise.all([proyectos$, proyecto$]);

  if (!proyecto) return next();

  const tareas = await Tarea.findAll({
    where: { proyectoId: proyecto?.id },
    // include: [{ model: Proyecto }],
  });

  res.render("tareas", {
    nombrePagina: "Tareas del proyecto",
    proyectos,
    proyecto,
    tareas,
  });
};

exports.formularioEditar = async (req, res, next) => {
  const proyectos$ = Proyecto.findAll();
  const proyecto$ = Proyecto.findOne({ where: { id: req.params.id } });
  const [proyectos, proyecto] = await Promise.all([proyectos$, proyecto$]);
  if (!proyecto || !proyectos) return next();
  res.render("nuevoProyecto", {
    nombrePagina: "Editar proyecto",
    proyectos,
    proyecto,
  });
};

exports.actualizarProyecto = async (req, res) => {
  try {
    const { nombre } = req.body;
    const proyectos = await Proyecto.findAll();
    const errores = [];
    if (!nombre) errores.push({ texto: "Agrega un nombre al proyecto" });
    if (errores.length > 0) {
      res.render("nuevoProyecto", {
        nombrePagina: "Nuevo Proyecto",
        errores,
        proyectos,
      });
      return;
    }
    await Proyecto.update({ nombre }, { where: { id: req.params.id } });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

exports.eliminarProyecto = async (req, res, next) => {
  const { url } = req.params;
  const result = await Proyecto.destroy({ where: { url: url } });
  if (!result) return next();
  res.status(200).json({ message: "Proyecto eliminado correctamente" });
};
