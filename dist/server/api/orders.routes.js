"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controllers_1 = require("../../controllers/order.controllers");
const router = (0, express_1.Router)();
const orderController = new order_controllers_1.OrderController();
// GET /orders
router.get("/", orderController.getAllOrders);
// GET /orders/:id
router.get("/:id", orderController.getOrderById);
// POST /orders
router.post("/", orderController.createOrder);
exports.default = router;
