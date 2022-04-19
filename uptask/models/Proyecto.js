const Sequelize = require("sequelize");
const db = require("../config/db");

const Proyecto = db.define("proyecto", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: Sequelize.STRING(100),
  url: Sequelize.STRING(100),
});

module.exports = Proyecto;
