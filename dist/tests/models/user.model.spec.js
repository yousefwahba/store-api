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
const user_model_1 = __importDefault(require("../../models/user.model"));
const database_1 = __importDefault(require("../../database"));
const userModel = new user_model_1.default();
describe("user model", () => {
    describe("Test methods exist", () => {
        it("should have a getAll method", () => {
            expect(userModel.getAll).toBeDefined();
        });
        it("getById method", () => {
            expect(userModel.getById).toBeDefined();
        });
        it("create method", () => {
            expect(userModel.create).toBeDefined();
        });
        it("update method", () => {
            expect(userModel.update).toBeDefined();
        });
        it("delete method", () => {
            expect(userModel.delete).toBeDefined();
        });
        it("authenticate method", () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });
    //test logic
    describe("Test Model logic", () => {
        const user = {
            name: "yousof",
            email: "yousof@gmail.com",
            password: "test123",
        };
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            const connection = yield database_1.default.connect();
            yield connection.query("DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;");
            connection.release();
        }));
        it("create method", () => __awaiter(void 0, void 0, void 0, function* () {
            const createdUser = yield userModel.create(user);
            expect(createdUser.email).toEqual(user.email);
        }));
        it("return all users", () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield userModel.getAll();
            expect(users.length).toBe(1);
        }));
        it("get one user", () => __awaiter(void 0, void 0, void 0, function* () {
            const singleUser = yield userModel.getById(1);
            expect(singleUser.name).toBe("yousof");
            expect(singleUser.email).toBe("yousof@gmail.com");
        }));
        it("update user", () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedUser = yield userModel.update(1, Object.assign(Object.assign({}, user), { name: "yousef", email: "yousef@gmail.com" }));
            expect(updatedUser.name).toBe("yousef");
            expect(updatedUser.email).toBe("yousef@gmail.com");
        }));
        it("delete user", () => __awaiter(void 0, void 0, void 0, function* () {
            const deletedUser = yield userModel.delete(1);
            expect(deletedUser.id).toBe(1);
        }));
    }); //end test logic
});
