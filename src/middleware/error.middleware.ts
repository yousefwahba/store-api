import { Request, Response, NextFunction } from "express";
const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const message = error.message || "somthing went wrong";
  res.status(500).json({ message });
  next();
};
export default errorMiddleware;
