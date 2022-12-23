"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorMiddleware = (error, req, res, next) => {
    const message = error.message || "something went wrong";
    res.status(500).send(message);
    next();
};
exports.default = errorMiddleware;
