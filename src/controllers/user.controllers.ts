import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import config from "../config";
import Jwt from "jsonwebtoken";
const userModel = new UserModel();

export class UserController {
  // GET /users
  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userModel.getAll();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  // GET /users/:id
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userModel.getById(req.params.id as unknown as number);
      if (!user) {
        throw new Error("user not found!");
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  // POST /users
  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userModel.create(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  // PUT /users/:id
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userModel.update(parseInt(req.params.id), req.body);
      if (!user) {
        throw new Error("user not found!");
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  // DELETE /users/:id
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userModel.delete(req.params.id as unknown as number);
      if (!user) {
        throw new Error("user not found!");
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  //authenticate
  async authenticateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await userModel.authenticate(email, password);
      const token = Jwt.sign({ user }, config.token as unknown as string);

      if (!user) {
        return res.status(401).json({ message: "not valid credentials" });
      }

      return res.json({
        data: { ...user, token },
        message: "authenticated successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}
