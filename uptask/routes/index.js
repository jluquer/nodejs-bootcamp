const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const proyectosController = require("../controllers/proyectosController");
const tareasController = require("../controllers/tareasController");
const usuariosController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");

module.exports = function () {
  // Proyectos
  router.get("/", authController.usuarioAutenticado, proyectosController.proyectosHome);
  router.get(
    "/nuevo-proyecto",
    authController.usuarioAutenticado,
    proyectosController.formularioProyecto
  );
  router.post(
    "/nuevo-proyecto",
    authController.usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.nuevoProyecto
  );

  router.get(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    proyectosController.proyectoPorUrl
  );
  router.get(
    "/proyectos/editar/:id",
    authController.usuarioAutenticado,
    proyectosController.formularioEditar
  );
  router.delete(
    "/proyectos/:url",
    authController.usuarioAutenticado,
    proyectosController.eliminarProyecto
  );
  router.post(
    "/nuevo-proyecto/:id",
    authController.usuarioAutenticado,
    body("nombre").not().isEmpty().trim().escape(),
    proyectosController.actualizarProyecto
  );

  // Tareas
  router.post("/proyectos/:url", authController.usuarioAutenticado, tareasController.agregarTarea);
  router.patch(
    "/tareas/:id",
    authController.usuarioAutenticado,
    tareasController.cambiarEstadoTarea
  );
  router.delete("/tareas/:id", authController.usuarioAutenticado, tareasController.eliminarTarea);

  // Usuarios
  router.get("/crear-cuenta", usuariosController.formCrearCuenta);
  router.get("/iniciar-sesion", usuariosController.formIniciarSesion);
  router.post("/crear-cuenta", usuariosController.crearCuenta);
  router.post("/iniciar-sesion", authController.autenticarUsuario);
  router.get("/cerrar-sesion", authController.usuarioAutenticado, authController.cerrarSesion);
  router.get("/reestablecer", usuariosController.formResetPassword);
  router.post("/reestablecer", authController.enviarToken);
  router.get("/reestablecer/:token", authController.validarToken);
  router.post("reestablecer/:token", authController.actualizarPassword);

  return router;
};
