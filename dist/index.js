"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const server_1 = __importDefault(require("./server"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("hello world");
});
app.use("/api", server_1.default);
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found!",
    });
});
app.use(error_middleware_1.default);
app.listen(3000, () => {
    console.log(`server is starting at port ${config_1.default.port || 3000} `);
});
exports.default = app;
