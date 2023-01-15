import { NextFunction, Request, Response } from "express";
import OrderModel from "../models/order.model";

const orderModel = new OrderModel();

export class OrderController {
  // GET /orders
  async getAllOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderModel.getAll();
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  // GET /orders/:id
  async getOrderById(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderModel.getById(
        req.params.id as unknown as number
      );
      if (!order) {
        throw new Error("order not found!");
      }
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  // POST /orders //should contain user_id & total price
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderModel.create(req.body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
}
