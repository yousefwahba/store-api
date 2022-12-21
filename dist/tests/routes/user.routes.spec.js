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
describe("user routes", () => {
    let user;
    let token;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        user = {
            name: "test user",
            email: "test@gmail.com",
            password: "test123",
        };
        const res = yield request.post("/api/users").send(user);
        user.id = res.body.id;
        // console.log(res.body);
        const authRes = yield request
            .post("/api/users/auth")
            .send({ email: user.email, password: user.password });
        const { token: userToken } = authRes.body.data;
        token = userToken;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const conn = yield database_1.default.connect();
        yield conn.query("DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;");
        conn.release();
    }));
    it("GET /users", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .get("/api/users/")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    }));
    it("POST /users", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            name: "new test user",
            email: "newtest@gmail.com",
            password: "test123",
        };
        const res = yield request.post("/api/users/").send(newUser);
        expect(res.status).toBe(201);
        expect(res.body.email).toEqual(newUser.email);
    }));
    it("PUT /users/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const updatedUser = {
            name: "updated test user",
            email: "test@gmail.com",
            password: "test123",
        };
        const res = yield request
            .put(`/api/users/${user.id}`)
            .send(updatedUser)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(res.body.email).toEqual(updatedUser.email);
    }));
    it("POST /users/auth ", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post("/api/users/auth")
            .send({ email: user.email, password: user.password });
        expect(res.status).toBe(200);
    }));
    it("DELETE /users/:id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.delete(`/api/users/${user.id}`);
        expect(res.status).toBe(200);
    }));
});
