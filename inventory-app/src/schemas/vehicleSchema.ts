import { z } from "zod";

export const vehicleSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
});