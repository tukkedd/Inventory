import { Router } from "express";
import { createCategory, getCategories } from "../controllers/categoriesController";
import { validate } from "../middleware/validate";
import { categorySchema } from "../schemas/categorySchema";
import prisma from "../prismaClient"; // Ajusta el import según tu proyecto

const router = Router();

router.post("/", validate(categorySchema), createCategory);
router.get("/", getCategories);

// Eliminar categoría por ID
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.category.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "No se pudo eliminar la categoría. Puede que tenga productos asociados." });
  }
});

export default router;