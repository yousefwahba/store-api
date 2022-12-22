import { Router } from "express";
import { ProductController } from "../../controllers/product.controllers";

const router = Router();
const productController = new ProductController();

// GET /products
router.get("/", productController.getAllProducts);

// GET /products/:id
router.get("/:id", productController.getProductById);

// POST /products
router.post("/", productController.createProduct);

// PUT /products/:id
router.put("/:id", productController.updateProduct);

// DELETE /products/:id
router.delete("/:id", productController.deleteProduct);

export default router;
