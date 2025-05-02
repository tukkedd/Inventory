import { Router } from "express";
import { createCategory, getCategories } from "../controllers/categoriesController";
import { validate } from "../middleware/validate";
import { categorySchema } from "../schemas/categorySchema";

const router = Router();

router.post("/", validate(categorySchema), createCategory);
router.get("/", getCategories);

export default router;