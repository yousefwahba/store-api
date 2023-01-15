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
class OrderModel {
    // get all orders
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("SELECT * FROM orders");
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("something went wrong");
            }
        });
    }
    // get order by id
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("SELECT * FROM orders WHERE id = $1", [
                    id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("can't get this order");
            }
        });
    }
    // create order
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("INSERT INTO orders (user_id, total_price) VALUES ($1, $2) RETURNING id,user_id,total_price", [order.user_id, Number(order.total_price)]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                // console.log(error);
                throw new Error("can't create this order");
            }
        });
    }
}
exports.default = OrderModel;
