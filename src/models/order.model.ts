import db from "../database";
import Order from "../types/order.type";

class OrderModel {
  // get all orders
  async getAll(): Promise<Array<Order>> {
    try {
      const conn = await db.connect();
      const result = await conn.query("SELECT * FROM orders");
      conn.release();
      return result.rows;
    } catch (error) {
      console.log(error);
      throw new Error("can't get all orders");
    }
  }

  // get order by id
  async getById(id: number): Promise<Order> {
    try {
      const conn = await db.connect();
      const result = await conn.query("SELECT * FROM orders WHERE id = $1", [
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      console.error(error);
      throw new Error("can't get this order");
    }
  }

  // create order
  async create(order: Order): Promise<Order> {
    try {
      const conn = await db.connect();
      const result = await conn.query(
        "INSERT INTO orders (user_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4) RETURNING id,user_id,product_id,quantity,total_price",
        [order.user_id, order.product_id, order.quantity, order.total_price]
      );
      conn.release();
      return result.rows[0];
    } catch (error) {
      console.log(error);
      throw new Error("can't create this order");
    }
  }
}
export default OrderModel;
