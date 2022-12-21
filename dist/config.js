"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, PGHOST, PGPORT, PGDB, PGDBTEST, PGUSER, PGPASSWORD, BCRYPT_PASSWORD, SALT_ROUNDS, TOKEN_SECRET, NODE_ENV, } = process.env;
exports.default = {
    port: PORT,
    host: PGHOST,
    dbPort: PGPORT,
    database: NODE_ENV === "dev" ? PGDB : PGDBTEST,
    user: PGUSER,
    password: PGPASSWORD,
    bcryptPass: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    token: TOKEN_SECRET,
    typeOfDatabase: NODE_ENV,
};
