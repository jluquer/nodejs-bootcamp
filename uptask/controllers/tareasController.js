const Proyecto = require("../models/Proyecto");
const Tarea = require("../models/Tarea");

exports.agregarTarea = async (req, res, next) => {
  const proyecto = await Proyecto.findOne({ where: { url: req.params.url } });
  const tarea = req.body.tarea;
  const estado = 0;
  const result = await Tarea.create({ tarea, estado, proyectoId: proyecto.id });
  if (!result) return next();

  res.redirect("/proyectos/" + proyecto.url);
};
