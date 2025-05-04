import express from "express";
import prisma from "../prismaClient"; // Ajusta el import según tu proyecto
import { createVehicle, getVehicles } from "../controllers/vehicleController";
import { validate } from "../middleware/validate";
import { vehicleSchema } from "../schemas/vehicleSchema";

const router = express.Router();

router.post("/", validate(vehicleSchema), createVehicle);
router.get("/", getVehicles);

// Eliminar vehículo por ID
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.vehicle.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "No se pudo eliminar el vehículo. Puede que tenga productos asociados." });
  }
});

export default router;