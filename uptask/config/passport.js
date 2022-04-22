const passport = require("passport");
const Usuario = require("../models/Usuario");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const usuario = Usuario.find({ where: { email } });
        if (!usuario.verificarPassword(password))
          return done(null, false, { message: "Password incorrecto" });
        return done(null, usuario);
      } catch (err) {
        return done(null, false, { message: "Esa cuenta no existe" });
      }
    }
  )
);

passport.serializeUser((usuario, callback) => {
  callback(null, usuario);
});

passport.deserializeUser((usuario, callback) => {
  callback(null, usuario);
});

module.exports = passport;
