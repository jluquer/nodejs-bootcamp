exports.proyectosHome = (req, res) => {
  res.render("index", {
    nombrePagina: "Proyectos",
  });
};

exports.formularioProyecto = (req, res) => {
  res.render("nuevoProyecto", {
    nombrePagina: "Nuevo Proyecto",
  });
};

exports.nuevoProyecto = (req, res) => {
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
  } catch (err) {
    console.log(err);
  }
};
