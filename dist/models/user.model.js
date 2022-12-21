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
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = (password) => {
    const salt = parseInt(config_1.default.salt, 10);
    return bcrypt_1.default.hashSync(`${password}${config_1.default.bcryptPass}`, salt);
};
class UserModel {
    //get all users
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("SELECT id,name,email FROM users");
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("can't get all users");
            }
        });
    }
    //get user by id
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("SELECT * FROM users WHERE id = $1", [
                    id,
                ]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("can't get this user");
            }
        });
    }
    //create user
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING name,email", [user.name, user.email, hashPassword(user.password)]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("can't create this user");
            }
        });
    }
    //update user
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id,name,email", [user.name, user.email, hashPassword(user.password), id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("can't update this user");
            }
        });
    }
    //delete user
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("DELETE FROM users WHERE id = $1 RETURNING id,name,email", [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("can't delete this user");
            }
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const result = yield conn.query("SELECT password FROM users WHERE email=$1", [email]);
                if (result.rows.length) {
                    const { password: hashPassword } = result.rows[0];
                    const isPasswordValid = bcrypt_1.default.compareSync(`${password}${config_1.default.bcryptPass}`, hashPassword);
                    if (isPasswordValid) {
                        const userInfo = yield conn.query("SELECT id,name,email FROM users WHERE email=($1)", [email]);
                        return userInfo.rows[0];
                    }
                }
                conn.release();
                return null;
            }
            catch (error) {
                throw new Error("Unable to login");
            }
        });
    }
}
exports.default = UserModel;
