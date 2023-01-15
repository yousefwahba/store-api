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
      throw new Error("something went wrong");
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
      throw new Error("can't get this order");
    }
  }

  // create order
  async create(order: Order): Promise<Order> {
    try {
      const conn = await db.connect();
      const result = await conn.query(
        "INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id,user_id,total_price",
        [order.user_id, Number(order.total_price)]
      );
      conn.release();
      return result.rows[0];
    } catch (error) {
      // console.log(error);
      throw new Error("can't create this order");
    }
  }
}
export default OrderModel;
