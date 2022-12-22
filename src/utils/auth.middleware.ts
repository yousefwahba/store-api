import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
const authValidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
    jwt.verify(token, config.token as unknown as string);
  } catch (error) {
    const err = new Error("Invalid token");
    return next(err);
  }

  next();
};

export default authValidatorMiddleware;
