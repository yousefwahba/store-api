"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    const message = error.message || "somthing went wrong";
    res.status(500).json({ message });
    next();
};
exports.default = errorMiddleware;
