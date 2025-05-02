import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { validate } from "../middleware/validate";
import { productSchema } from "../schemas/productSchema";

const router = Router();

router.post("/", validate(productSchema), createProduct);
router.get("/", getProducts);
router.put("/:id", validate(productSchema), updateProduct);
router.delete("/:id", deleteProduct);

export default router;