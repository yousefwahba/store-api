import supertest from "supertest";
import db from "../../database";
import User from "../../types/user.type";
import Product from "../../types/product.type";
import Order from "../../types/order.type";
import app from "../../index";

const request = supertest(app);

describe("order routes", () => {
  let user: User;
  let product: Product;
  let order: Order;
  let token: string;

  beforeAll(async () => {
    user = {
      name: "test user",
      email: "test@gmail.com",
      password: "test123",
    } as User;
    const userRes = await request.post("/api/users").send(user);
    user.id = userRes.body.id;
    const authRes = await request
      .post("/api/users/auth")
      .send({ email: user.email, password: user.password });
    const { token: userToken } = authRes.body.data;
    token = userToken;

    product = {
      name: "test product",
      price: 19.99,
      description: "test product description",
    } as Product;
    const productRes = await request.post("/api/products").send(product);
    product.id = productRes.body.id;

    order = {
      user_id: user.id,
      product_id: product.id,
      quantity: 2,
      total_price: 39.98,
    } as Order;
    order.id = product.id;
  });

  afterAll(async () => {
    const conn = await db.connect();
    await conn.query(
      "DELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1;"
    );
    await conn.query(
      "DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;"
    );
    await conn.query(
      "DELETE FROM products; \nALTER SEQUENCE products_id_seq RESTART WITH 1;"
    );
    conn.release();
  });

  it("GET /orders", async () => {
    const res = await request
      .get("/api/orders/")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });

  it("POST /orders", async () => {
    const res = await request.post("/api/orders/").send(order);
    expect(res.status).toBe(201);
    expect(Number(res.body.total_price)).toEqual(order.total_price);
  });

  it("GET /orders/:id", async () => {
    const res = await request
      .get(`/api/orders/${order.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
  });
});
