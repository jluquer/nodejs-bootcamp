const Proyecto = require("../models/Proyecto");
const slug = require("slug");

exports.proyectosHome = async (req, res) => {
  const proyectos = await Proyecto.findAll();
  res.render("index", {
    nombrePagina: "Proyectos",
    proyectos
  });
};

exports.formularioProyecto = (req, res) => {
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
  });
};

exports.nuevoProyecto = async (req, res) => {
  try {
    const { nombre } = req.body;
    const errores = [];
    if (!nombre) errores.push({ texto: "Agrega un nombre al proyecto" });
    if (errores.length > 0) {
      return res.render("nuevoProyecto", {
        nombrePagina: "Nuevo Proyecto",
        errores,
      });
    }
    await Proyecto.create({ nombre,  });
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};
