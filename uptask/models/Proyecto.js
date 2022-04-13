import * as Sequelize from "sequelize";
import db from "../config/db";

export default class Proyecto  extends Model {}

User.init({
    id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: Sequelize.STRING,
  url: Sequelize.STRING,
}, {
  db, // We need to pass the connection instance
  modelName: 'User' // We need to choose the model name
});