const Usuario = require("../models/Usuario");

exports.formCrearCuenta = (req, res, next) => {
  res.render("crearCuenta", { nombrePagina: "Crear cuenta en Uptask" });
};

exports.crearCuenta = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await Usuario.create({ email, password });
    res.redirect("/iniciar-sesion");
  } catch (error) {
    res.render("crearCuenta", {
      nombrePagina: "Crear cuenta en Uptask",
      errores: error.errors.map((err) => err.message),
    });
  }
};
