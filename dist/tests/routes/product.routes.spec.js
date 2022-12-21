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
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../database"));
const index_1 = __importDefault(require("../../index"));
const request = (0, supertest_1.default)(index_1.default);
describe("product routes", () => {
    let product;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        product = {
            name: "test product",
            price: 19.99,
            description: "test product description",
        };
        const res = yield request.post("/api/products").send(product);
        product.id = res.body.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        yield conn.query("DELETE FROM products; \nALTER SEQUENCE products_id_seq RESTART WITH 1;");
        conn.release();
    }));
    it("GET /products", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get("/api/products");
        expect(res.status).toBe(200);
    }));
    it("GET /products/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`/api/products/${product.id}`);
        expect(res.status).toBe(200);
        expect(res.body.description).toEqual(product.description);
        expect(res.body.name).toEqual(product.name);
    }));
    it("POST /products", () => __awaiter(void 0, void 0, void 0, function* () {
        const newProduct = {
            name: "new test product",
            price: 29.99,
            description: "new test product description",
        };
        const res = yield request.post("/api/products").send(newProduct);
        expect(res.status).toBe(201);
    }));
    it("PUT /products/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedProduct = {
            name: "updated test product",
            price: 39.99,
            description: "updated test product description",
        };
        const res = yield request
            .put(`/api/products/${product.id}`)
            .send(updatedProduct);
        expect(res.status).toBe(200);
        expect(res.body.description).toEqual(updatedProduct.description);
        expect(res.body.name).toEqual(updatedProduct.name);
    }));
    it("DELETE /products/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.delete(`/api/products/${product.id}`);
        expect(res.status).toBe(200);
    }));
});
