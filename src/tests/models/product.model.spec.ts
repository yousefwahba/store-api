import ProductModel from "../../models/product.model";
import db from "../../database";
import Product from "../../types/product.type";

const productModel = new ProductModel();
describe("product model", () => {
  describe("Test methods exist", () => {
    it("should have a getAll method", () => {
      expect(productModel.getAll).toBeDefined();
    });

    it("should have a getById method", () => {
      expect(productModel.getById).toBeDefined();
    });

    it("should have a create method", () => {
      expect(productModel.create).toBeDefined();
    });

    it("should have an update method", () => {
      expect(productModel.update).toBeDefined();
    });

    it("should have a delete method", () => {
      expect(productModel.delete).toBeDefined();
    });
  });

  describe("Test model logic", () => {
    const product = {
      name: "test product",
      price: 9.99,
      description: "This is a test product",
    } as Product;

    afterAll(async () => {
      const connection = await db.connect();
      await connection.query(
        "DELETE FROM products; \nALTER SEQUENCE products_id_seq RESTART WITH 1;"
      );
      connection.release();
    });

    it("create method", async () => {
      const createdProduct = await productModel.create(product);
      expect(createdProduct.name).toEqual(product.name);
      expect(createdProduct.description).toEqual(product.description);
      expect(Number(createdProduct.price)).toEqual(product.price);
      //   console.log(createdProduct.price, product.price);
    });

    it("getAll method", async () => {
      await productModel.create(product);
      const products = await productModel.getAll();
      expect(products.length).toBe(2);
    });

    it("getById method", async () => {
      const createdProduct = await productModel.create(product);
      const retrievedProduct = await productModel.getById(
        createdProduct.id as unknown as number
      );
      expect(retrievedProduct).toEqual(createdProduct);
    });

    it("update method", async () => {
      const createdProduct = await productModel.create(product);
      const updatedProduct = {
        ...createdProduct,
        name: "updated product name",
      };
      const result = await productModel.update(
        createdProduct.id as unknown as number,
        updatedProduct
      );
      expect(result).toEqual(updatedProduct);
    });

    it("delete method", async () => {
      const createdProduct = await productModel.create(product);
      const result = await productModel.delete(
        createdProduct.id as unknown as number
      );
      expect(result).toEqual(createdProduct);
    });
  });
});
