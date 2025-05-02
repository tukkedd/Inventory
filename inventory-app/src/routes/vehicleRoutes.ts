import { Router } from "express";
import { createVehicle, getVehicles } from "../controllers/vehicleController";
import { validate } from "../middleware/validate";
import { vehicleSchema } from "../schemas/vehicleSchema";

const router = Router();

router.post("/", validate(vehicleSchema), createVehicle);
router.get("/", getVehicles);

export default router;