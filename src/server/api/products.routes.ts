import { Router } from "express";
import { ProductController } from "../../controllers/product.controllers";
import authValidatorMiddleware from "../../utils/auth.middleware";
const router = Router();
const productController = new ProductController();

// GET /products
router.get("/", productController.getAllProducts);

// GET /products/:id
router.get("/:id", productController.getProductById);

// POST /products
router.post("/", authValidatorMiddleware, productController.createProduct);

// PUT /products/:id
router.put("/:id", productController.updateProduct);

// DELETE /products/:id
router.delete("/:id", productController.deleteProduct);

export default router;
