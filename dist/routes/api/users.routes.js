"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../../controllers/user.controllers");
const auth_middleware_1 = __importDefault(require("../../middleware/auth.middleware"));
const router = (0, express_1.Router)();
const userController = new user_controllers_1.UserController();
// GET /users
router.get("/", auth_middleware_1.default, userController.getAllUsers);
// GET /users/:id
router.get("/:id", auth_middleware_1.default, userController.getUserById);
// POST /users
router.post("/", userController.createUser);
// PUT /users/:id
router.put("/:id", userController.updateUser);
// DELETE /users/:id
router.delete("/:id", userController.deleteUser);
//authentication (login)
router.post("/auth", userController.authenticateUser);
exports.default = router;
