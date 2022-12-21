import supertest from "supertest";
import db from "../../database";
import Product from "../../types/product.type";
import app from "../../index";

const request = supertest(app);

describe("product routes", () => {
  let product: Product;

  beforeAll(async () => {
    product = {
      name: "test product",
      price: 19.99,
      description: "test product description",
    } as Product;
    const res = await request.post("/api/products").send(product);
    product.id = res.body.id;
  });
  afterAll(async () => {
    const conn = await db.connect();
    await conn.query(
      "DELETE FROM products; \nALTER SEQUENCE products_id_seq RESTART WITH 1;"
    );
    conn.release();
  });
  it("GET /products", async () => {
    const res = await request.get("/api/products");
    expect(res.status).toBe(200);
  });
  it("GET /products/:id", async () => {
    const res = await request.get(`/api/products/${product.id}`);
    expect(res.status).toBe(200);
    expect(res.body.description).toEqual(product.description);
    expect(res.body.name).toEqual(product.name);
  });
  it("POST /products", async () => {
    const newProduct = {
      name: "new test product",
      price: 29.99,
      description: "new test product description",
    } as Product;
    const res = await request.post("/api/products").send(newProduct);
    expect(res.status).toBe(201);
  });
  it("PUT /products/:id", async () => {
    const updatedProduct = {
      name: "updated test product",
      price: 39.99,
      description: "updated test product description",
    } as Product;
    const res = await request
      .put(`/api/products/${product.id}`)
      .send(updatedProduct);
    expect(res.status).toBe(200);
    expect(res.body.description).toEqual(updatedProduct.description);
    expect(res.body.name).toEqual(updatedProduct.name);
  });
  it("DELETE /products/:id", async () => {
    const res = await request.delete(`/api/products/${product.id}`);
    expect(res.status).toBe(200);
  });
});
