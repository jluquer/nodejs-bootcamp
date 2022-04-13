import { Router } from "express";
const routes = Router();
import {
  proyectosHome,
  formularioProyecto,
  nuevoProyecto,
} from "../controllers/proyectosController.js";

routes.get("/", proyectosHome);
routes.get("/nuevo-proyecto", formularioProyecto);
routes.post("/nuevo-proyecto", nuevoProyecto);

export default routes;
