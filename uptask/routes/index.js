const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const proyectosController = require("../controllers/proyectosController");
const tareasController = require("../controllers/tareasController");
const usuariosController = require("../controllers/usuariosController");

module.exports = function () {
  // Proyectos
  router.get("/", proyectosController.proyectosHome);
  router.get("/nuevo-proyecto", proyectosController.formularioProyecto);
  router.post(
    "/nuevo-proyecto",
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
  );

  router.get("/proyectos/:url", proyectosController.proyectoPorUrl);
  router.get("/proyectos/editar/:id", proyectosController.formularioEditar);
  router.delete("/proyectos/:url", proyectosController.eliminarProyecto);
  router.post(
    "/nuevo-proyecto/:id",
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
  );

  // Tareas
  router.post("/proyectos/:url", tareasController.agregarTarea);
  router.patch("/tareas/:id", tareasController.cambiarEstadoTarea);
  router.delete("/tareas/:id", tareasController.eliminarTarea);

  // Usuarios
  router.get("/crear-cuenta", usuariosController.formCrearCuenta);
  router.get("/iniciar-sesion", usuariosController.formIniciarSesion);
  router.post("/crear-cuenta", usuariosController.crearCuenta);

  return router;
};
