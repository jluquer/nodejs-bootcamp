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

exports.cambiarEstadoTarea = async (req, res, next) => {
  const tarea = await Tarea.findOne({ where: { id: req.params.id } });

  if (!tarea) return res.status(404);
  tarea.estado = tarea.estado === 0 ? 1 : 0;
  const result = await tarea.save();

  if (!result) return next();
  res.status(200).json({ message: "Actualizado"});
};
