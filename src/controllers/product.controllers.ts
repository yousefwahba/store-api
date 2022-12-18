import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/product.model";

const productModel = new ProductModel();

export class ProductController {
  // GET /products
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productModel.getAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  // GET /products/:id
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productModel.getById(
        req.params.id as unknown as number
      );
      if (!product) {
        throw new Error("product not found!");
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  // POST /products
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productModel.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  // PUT /products/:id
  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productModel.update(
        parseInt(req.params.id),
        req.body
      );
      if (!product) {
        throw new Error("product not found!");
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /products/:id
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productModel.delete(
        req.params.id as unknown as number
      );
      if (!product) {
        throw new Error("product not found!");
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}
