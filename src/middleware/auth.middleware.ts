import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

interface Error {
  status?: number;
  name?: string;
  message?: string;
}

const handleError = (next: NextFunction) => {
  const err: Error = new Error("Login Error: Please Try Again");
  err.status = 401;
  next(err);
};

const authValidatorMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get("Authorization");
    if (authHeader) {
      //check if token bearer or not
      const bearer = authHeader.split(" ")[0].toLowerCase();
      const token = authHeader.split(" ")[1];
      if (token && bearer === "bearer") {
        const decode = jwt.verify(token, config.token as unknown as string);
        if (decode) next();
        else {
          handleError(next);
        }
      } else {
        handleError(next);
      }
    } else {
      handleError(next);
    }
  } catch (error) {
    handleError(next);
  }
};

export default authValidatorMiddleware;
