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
exports.UserController = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel = new user_model_1.default();
class UserController {
    // GET /users
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel.getAll();
                res.status(200).json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // GET /users/:id
    getUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel.getById(req.params.id);
                if (!user) {
                    throw new Error("user not found!");
                }
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // POST /users
    createUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel.create(req.body);
                res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // PUT /users/:id
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel.update(parseInt(req.params.id), req.body);
                if (!user) {
                    throw new Error("user not found!");
                }
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    // DELETE /users/:id
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel.delete(req.params.id);
                if (!user) {
                    throw new Error("user not found!");
                }
                res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    //authenticate
    authenticateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield userModel.authenticate(email, password);
                const token = jsonwebtoken_1.default.sign({ user }, config_1.default.token);
                if (!user) {
                    return res.status(401).json({ message: "not valid credentials" });
                }
                return res.json({
                    data: Object.assign(Object.assign({}, user), { token }),
                    message: "authenticated successfully",
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UserController = UserController;
