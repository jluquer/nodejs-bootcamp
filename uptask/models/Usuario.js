const Sequelize = require("sequelize");
const db = require("../config/db");
const Proyecto = require("./Proyecto");
const bcrypt = require("bcrypt-nodejs");

const Usuario = db.define(
  "usuario",
  {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      unique: { args: true, msg: "Usuario ya registrado" },
      validate: {
        isEmail: { msg: "Agrega un correo válido" },
        notEmpty: { msg: "El email no puede ir vacio" },
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: { msg: "El password no puede ir vacio" },
      },
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE,
  },
  {
    hooks: {
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
      },
    },
  }
);

Usuario.prototype.verificarPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

Usuario.hasMany(Proyecto);

module.exports = Usuario;
