"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const orderModel = new order_model_1.default();
class OrderController {
    // GET /orders
    getAllOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orderModel.getAll();
                res.status(200).json(orders);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // GET /orders/:id
    getOrderById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield orderModel.getById(req.params.id);
                if (!order) {
                    throw new Error("order not found!");
                }
                res.status(200).json(order);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // POST /orders //should contain user_id & total price
    createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield orderModel.create(req.body);
                res.status(201).json(order);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.OrderController = OrderController;
