const express = require("express");
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const db = require("./config/db");
const app = express();
const port = process.env.PORT || 3000;
const helpers = require("./helpers");
const passport = require("./config/passport");

// DB
require("./models/Proyecto");
require("./models/Tarea");
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

app.use(flash());

app.use(cookieParser());
app.use(
  session({
    secret: "supersecreto",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Var dump
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.mensajes = req.flash();
  res.locals.usuario = { ...req.user } || null;
  next();
});

// Routes
app.use("/", routes());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
