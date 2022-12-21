"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const handleError = (next) => {
    const err = new Error("Login Error: Please Try Again");
    err.status = 401;
    next(err);
};
const authValidatorMiddleware = (req, res, next) => {
    try {
        const authHeader = req.get("Authorization");
        if (authHeader) {
            //check if token bearer or not
            const bearer = authHeader.split(" ")[0].toLowerCase();
            const token = authHeader.split(" ")[1];
            if (token && bearer === "bearer") {
                const decode = jsonwebtoken_1.default.verify(token, config_1.default.token);
                if (decode)
                    next();
                else {
                    handleError(next);
                }
            }
            else {
                handleError(next);
            }
        }
        else {
            handleError(next);
        }
    }
    catch (error) {
        handleError(next);
    }
};
exports.default = authValidatorMiddleware;
