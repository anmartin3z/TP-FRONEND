// routes/detalleServicio.js

import express from "express";
import { crearDetalleServicio,obtenerTestigosPorServicio } from "../controllers/detalleServicioController.js";

const router = express.Router();

router.post("/", crearDetalleServicio);
router.get("/testigos/:servicio_id", obtenerTestigosPorServicio);

export default router;
