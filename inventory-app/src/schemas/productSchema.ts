import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().optional(),
  price: z.number().nonnegative("El precio debe ser un número positivo"),
  stock: z.number().int().nonnegative("El stock debe ser un número positivo"),
  categoryId: z.preprocess(
    val => val === "" ? null : val,
    z.number().int().nullable().optional()
  ),
  vehicleId: z.preprocess(
    val => val === "" ? null : val,
    z.number().int().nullable().optional()
  ),
});