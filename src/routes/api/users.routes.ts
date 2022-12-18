import { Router } from "express";
import { UserController } from "../../controllers/user.controllers";
const router = Router();
const userController = new UserController();

// GET /users
router.get("/", userController.getAllUsers);

// GET /users/:id
router.get("/:id", userController.getUserById);

// POST /users
router.post("/", userController.createUser);

// PUT /users/:id
router.put("/:id", userController.updateUser);

// DELETE /users/:id
router.delete("/:id", userController.deleteUser);

//authentication
router.post("/auth", userController.authenticateUser);

export default router;
