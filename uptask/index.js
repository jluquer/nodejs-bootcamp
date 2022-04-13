import express from "express";
import routes from "./routes/index.js";
import * as path from "path";
import bodyParser from "body-parser";
import {fileURLToPath} from 'url';


const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./views"));

// Static
app.use(express.static("public"));

// json
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
