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
const order_model_1 = __importDefault(require("../../models/order.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const database_1 = __importDefault(require("../../database"));
const orderModel = new order_model_1.default();
const userModel = new user_model_1.default();
const productModel = new product_model_1.default();
describe("order model", () => {
    describe("Test methods exist", () => {
        it("getAll method", () => {
            expect(orderModel.getAll).toBeDefined();
        });
        it("getById method", () => {
            expect(orderModel.getById).toBeDefined();
        });
        it("create method", () => {
            expect(orderModel.create).toBeDefined();
        });
    });
    describe("Test model logic", () => {
        const user = {
            name: "test user",
            email: "test@gmail.com",
            password: "test123",
        };
        const product = {
            name: "test product",
            price: 9.99,
            description: "This is a test product",
        };
        const order = {
            user_id: 1,
            product_id: 1,
            quantity: 2,
            total_price: 19.98,
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield userModel.create(user);
            yield productModel.create(product);
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            yield connection.query("DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1;\nDELETE FROM users;\n ALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\n ALTER SEQUENCE products_id_seq RESTART WITH 1;");
            connection.release();
        }));
        it("create method", () => __awaiter(void 0, void 0, void 0, function* () {
            const createdOrder = yield orderModel.create(order);
            expect(createdOrder.user_id).toBe(1);
            expect(createdOrder.product_id).toBe(1);
            expect(createdOrder.quantity).toBe(2);
            //   expect(createdOrder.total_price).toBe(order.total_price);
        }));
        it("getAll method", () => __awaiter(void 0, void 0, void 0, function* () {
            const createdOrder = yield orderModel.create(order);
            const orders = yield orderModel.getAll();
            expect(orders.length).toBe(2);
        }));
        it("getById method", () => __awaiter(void 0, void 0, void 0, function* () {
            const retrievedOrder = yield orderModel.getById(1);
            expect(retrievedOrder.user_id).toBe(1);
        }));
    });
});
