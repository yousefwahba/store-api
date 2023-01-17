"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controllers_1 = require("../../controllers/order.controllers");
const auth_middleware_1 = __importDefault(require("../../utils/auth.middleware"));
const router = (0, express_1.Router)();
const orderController = new order_controllers_1.OrderController();
// GET /orders
router.get("/", auth_middleware_1.default, orderController.getAllOrders);
// GET /orders/:id
router.get("/:id", auth_middleware_1.default, orderController.getOrderById);
// POST /orders
router.post("/", auth_middleware_1.default, orderController.createOrder);
exports.default = router;
