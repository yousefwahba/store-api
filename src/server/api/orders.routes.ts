import { Router } from "express";
import { OrderController } from "../../controllers/order.controllers";
import authValidatorMiddleware from "../../utils/auth.middleware";
const router = Router();
const orderController = new OrderController();

// GET /orders
router.get("/", authValidatorMiddleware, orderController.getAllOrders);

// GET /orders/:id
router.get("/:id", authValidatorMiddleware, orderController.getOrderById);

// POST /orders
router.post("/", authValidatorMiddleware, orderController.createOrder);

export default router;
