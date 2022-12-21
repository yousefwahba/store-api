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
describe("order routes", () => {
    let user;
    let product;
    let order;
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        user = {
            name: "test user",
            email: "test@gmail.com",
            password: "test123",
        };
        const userRes = yield request.post("/api/users").send(user);
        user.id = userRes.body.id;
        const authRes = yield request
            .post("/api/users/auth")
            .send({ email: user.email, password: user.password });
        const { token: userToken } = authRes.body.data;
        token = userToken;
        product = {
            name: "test product",
            price: 19.99,
            description: "test product description",
        };
        const productRes = yield request.post("/api/products").send(product);
        product.id = productRes.body.id;
        order = {
            user_id: user.id,
            product_id: product.id,
            quantity: 2,
            total_price: 39.98,
        };
        order.id = product.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        yield conn.query("DELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1;");
        yield conn.query("DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;");
        yield conn.query("DELETE FROM products; \nALTER SEQUENCE products_id_seq RESTART WITH 1;");
        conn.release();
    }));
    it("GET /orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get("/api/orders/")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
    it("POST /orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post("/api/orders/").send(order);
        expect(res.status).toBe(201);
        expect(Number(res.body.total_price)).toEqual(order.total_price);
    }));
    it("GET /orders/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get(`/api/orders/${order.id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
});
