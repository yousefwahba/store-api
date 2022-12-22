"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controllers_1 = require("../../controllers/product.controllers");
const router = (0, express_1.Router)();
const productController = new product_controllers_1.ProductController();
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
exports.default = router;
