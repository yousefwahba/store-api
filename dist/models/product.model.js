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
const database_1 = __importDefault(require("../database"));
class ProductModel {
    // get all products
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("SELECT * FROM products");
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Can't get all products");
            }
        });
    }
    // get product by id
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("SELECT * FROM products WHERE id = $1", [
                    id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Can't get this product");
            }
        });
    }
    // create product
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *", [product.name, product.price, product.description]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Can't create this product");
            }
        });
    }
    // update product
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4 RETURNING *", [product.name, product.price, product.description, id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Can't update this product");
            }
        });
    }
    // delete product
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Can't delete this product");
            }
        });
    }
}
exports.default = ProductModel;
