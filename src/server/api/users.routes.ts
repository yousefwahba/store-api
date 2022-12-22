import { Router } from "express";
import { UserController } from "../../controllers/user.controllers";
import authValidatorMiddleware from "../../utils/auth.middleware";

const router = Router();
const userController = new UserController();

// GET /users
router.get("/", authValidatorMiddleware, userController.getAllUsers);

// GET /users/:id
router.get("/:id", authValidatorMiddleware, userController.getUserById);

// POST /users
router.post("/", userController.createUser);

// PUT /users/:id
router.put("/:id", userController.updateUser);

// DELETE /users/:id
router.delete("/:id", userController.deleteUser);

//authentication (login)
router.post("/auth", userController.authenticateUser);

export default router;
