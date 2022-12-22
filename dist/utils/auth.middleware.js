"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const authValidatorMiddleware = (req, res, next) => {
    // Check if the 'Authorization' header is present
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const err = new Error("Missing authorization header");
        return next(err);
    }
    // Check if the authorization header has the correct format
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        const err = new Error("Invalid authorization header");
        return next(err);
    }
    // Verify the JSON web token
    try {
        jsonwebtoken_1.default.verify(token, config_1.default.token);
    }
    catch (error) {
        const err = new Error("Invalid token");
        return next(err);
    }
    next();
};
exports.default = authValidatorMiddleware;
