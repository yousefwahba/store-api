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
const product_model_1 = __importDefault(require("../../models/product.model"));
const database_1 = __importDefault(require("../../database"));
const productModel = new product_model_1.default();
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
        };
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            yield connection.query("DELETE FROM products; \nALTER SEQUENCE products_id_seq RESTART WITH 1;");
            connection.release();
        }));
        it("create method", () => __awaiter(void 0, void 0, void 0, function* () {
            const createdProduct = yield productModel.create(product);
            expect(createdProduct.name).toEqual(product.name);
            expect(createdProduct.description).toEqual(product.description);
            expect(Number(createdProduct.price)).toEqual(product.price);
            //   console.log(createdProduct.price, product.price);
        }));
        it("getAll method", () => __awaiter(void 0, void 0, void 0, function* () {
            yield productModel.create(product);
            const products = yield productModel.getAll();
            expect(products.length).toBe(2);
        }));
        it("getById method", () => __awaiter(void 0, void 0, void 0, function* () {
            const createdProduct = yield productModel.create(product);
            const retrievedProduct = yield productModel.getById(createdProduct.id);
            expect(retrievedProduct).toEqual(createdProduct);
        }));
        it("update method", () => __awaiter(void 0, void 0, void 0, function* () {
            const createdProduct = yield productModel.create(product);
            const updatedProduct = Object.assign(Object.assign({}, createdProduct), { name: "updated product name" });
            const result = yield productModel.update(createdProduct.id, updatedProduct);
            expect(result).toEqual(updatedProduct);
        }));
        it("delete method", () => __awaiter(void 0, void 0, void 0, function* () {
            const createdProduct = yield productModel.create(product);
            const result = yield productModel.delete(createdProduct.id);
            expect(result).toEqual(createdProduct);
        }));
    });
});
