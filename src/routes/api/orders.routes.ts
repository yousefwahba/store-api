import { Router } from "express";
import { OrderController } from "../../controllers/order.controllers";

const router = Router();
const orderController = new OrderController();

// GET /orders
router.get("/", orderController.getAllOrders);

// GET /orders/:id
router.get("/:id", orderController.getOrderById);

// POST /orders
router.post("/", orderController.createOrder);

export default router;
