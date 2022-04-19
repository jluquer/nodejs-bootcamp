const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;
const helpers = require("./helpers");

// DB
require("./models/Proyecto");
db.sync()
  .then(() => {
    console.log("Conectado al servidor");
  })
  .catch((err) => console.log(err));

// Template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

// Static
app.use(express.static("public"));

// json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Var dump
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  next();
});

// Routes
app.use("/", routes());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
