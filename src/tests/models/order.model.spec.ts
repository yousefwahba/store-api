import OrderModel from "../../models/order.model";
import UserModel from "../../models/user.model";
import ProductModel from "../../models/product.model";
import db from "../../database";
import Order from "../../types/order.type";
import User from "../../types/user.type";
import Product from "../../types/product.type";

const orderModel = new OrderModel();
const userModel = new UserModel();
const productModel = new ProductModel();

describe("order model", () => {
  describe("Test methods exist", () => {
    it("getAll method", () => {
      expect(orderModel.getAll).toBeDefined();
    });

    it("getById method", () => {
      expect(orderModel.getById).toBeDefined();
    });

    it("create method", () => {
      expect(orderModel.create).toBeDefined();
    });
  });

  describe("Test model logic", () => {
    const user = {
      name: "test user",
      email: "test@gmail.com",
      password: "test123",
    } as User;

    const product = {
      name: "test product",
      price: 9.99,
      description: "This is a test product",
    } as Product;

    const order = {
      user_id: 1,
      total_price: 19,
    } as Order;

    beforeAll(async () => {
      await userModel.create(user);
      await productModel.create(product);
    });
    afterAll(async () => {
      const connection = await db.connect();
      await connection.query(
        "DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;\nDELETE FROM order_products;\n ALTER SEQUENCE order_products_id_seq RESTART WITH 1;"
      );
      connection.release();
    });

    it("create method", async () => {
      const createdOrder = await orderModel.create(order);
      expect(createdOrder.user_id).toBe(order.user_id);
      expect(createdOrder.total_price).toBe(order.total_price);
    });

    it("getAll method", async () => {
      const createdOrder = await orderModel.create(order);
      const orders = await orderModel.getAll();
      expect(orders.length).toBe(2);
    });

    it("getById method", async () => {
      const retrievedOrder = await orderModel.getById(1);
      expect(retrievedOrder.user_id).toBe(1);
    });
  });
});
