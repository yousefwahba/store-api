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
exports.ProductController = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const productModel = new product_model_1.default();
class ProductController {
    // GET /products
    getAllProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productModel.getAll();
                res.status(200).json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // GET /products/:id
    getProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productModel.getById(req.params.id);
                if (!product) {
                    throw new Error("product not found!");
                }
                res.status(200).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // POST /products
    createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productModel.create(req.body);
                res.status(201).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // PUT /products/:id
    updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productModel.update(parseInt(req.params.id), req.body);
                if (!product) {
                    throw new Error("product not found!");
                }
                res.status(200).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // DELETE /products/:id
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productModel.delete(req.params.id);
                if (!product) {
                    throw new Error("product not found!");
                }
                res.status(200).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.ProductController = ProductController;
