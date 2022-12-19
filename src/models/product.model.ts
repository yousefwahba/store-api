import Product from "../types/product.type";
import db from "../database";

class ProductModel {
  // get all products
  async getAll(): Promise<Array<Product>> {
    try {
      const conn = await db.connect();
      const result = await conn.query("SELECT * FROM products");
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error("Can't get all products");
    }
  }

  // get product by id
  async getById(id: number): Promise<Product> {
    try {
      const conn = await db.connect();
      const result = await conn.query("SELECT * FROM products WHERE id = $1", [
        id,
      ]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Can't get this product");
    }
  }

  // create product
  async create(product: Product): Promise<Product> {
    try {
      const conn = await db.connect();
      const result = await conn.query(
        "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *",
        [product.name, product.price, product.description]
      );
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Can't create this product");
    }
  }

  // update product
  async update(id: number, product: Product): Promise<Product> {
    try {
      const conn = await db.connect();
      const result = await conn.query(
        "UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *",
        [product.name, product.price, product.description, id]
      );
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Can't update this product");
    }
  }

  // delete product
  async delete(id: number): Promise<Product> {
    try {
      const conn = await db.connect();
      const result = await conn.query(
        "DELETE FROM products WHERE id = $1 RETURNING *",
        [id]
      );
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error("Can't delete this product");
    }
  }
}

export default ProductModel;
