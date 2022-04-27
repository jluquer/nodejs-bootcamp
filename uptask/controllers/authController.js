const passport = require("passport");
const Usuario = require("../models/Usuario");
const crypto = require("crypto");
const Sequelize = require("sequelize");

exports.autenticarUsuario = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/iniciar-sesion",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

exports.usuarioAutenticado = (req, res, next) => {
  req.isAuthenticated() ? next() : res.redirect("/iniciar-sesion");
};

exports.cerrarSesion = (req, res) => {
  req.session.destroy(() => res.redirect("/iniciar-sesion"));
};

exports.enviarToken = async (req, res) => {
  const usuario = await Usuario.findOne({ where: { email: req.body.email } });

  if (!usuario) {
    req.flash("error", "Esa cuenta no existe");
    res.redirect("/reestablecer");
  }

  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expiracion = Date.now() + 3600000;
  await usuario.save();

  const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;

  res.send(resetUrl);
};

exports.validarToken = async (req, res) => {
  const usuario = await Usuario.findOne({ where: { token: req.params.token } });

  if (!usuario) {
    req.flash("error", "Token invalido");
    res.redirect("/reestablecer");
  }

  res.render("resetPassword", {
    nombrePagina: "Reestablecer contraseña",
  });
};

exports.actualizarPassword = async (req, res) => {
  const usuario = await Usuario.findOne({
    where: { token: req.params.token, expiracion: { [Sequelize.Op.gte]: Date.now() } },
  });

  if (!usuario) {
    req.flash("error", "Token invalido");
    res.redirect("/reestablecer");
  }

  res.send(req.params.token);
};
