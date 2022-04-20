const Proyecto = require("../models/Proyecto");
const slug = require("slug");

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
  const url = req.params.url;
  const proyectos = await Proyecto.findAll();
  const proyecto = await Proyecto.findOne({ where: { url: url } });
  if (!proyecto || !proyectos) return next();
  res.render("tareas", {
    nombrePagina: "Tareas del proyecto",
    proyectos,
    proyecto,
  });
};
