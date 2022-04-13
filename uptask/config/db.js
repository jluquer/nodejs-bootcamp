import { Sequelize } from "sequelize";

const DatabaseConnection = new Sequelize("uptask", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  define: {
    timestamps: false,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default DatabaseConnection;
