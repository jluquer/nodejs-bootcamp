const Usuario = require("../models/Usuario");

exports.formCrearCuenta = (req, res, next) => {
  res.render("crearCuenta", { nombrePagina: "Crear cuenta en Uptask" });
};

exports.crearCuenta = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    await Usuario.create({ email, password });
    res.redirect("/iniciar-sesion");
  } catch (error) {
    req.flash(
      "error",
      error.errors.map((err) => err.message)
    );
    res.render("crearCuenta", {
      nombrePagina: "Crear cuenta en Uptask",
      mensajes: req.flash(),
      categoria: "error",
      email,
      password,
    });
  }
};
