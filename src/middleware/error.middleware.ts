import express from "express";

const errorMiddleware = (
  error: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const message = error.message || "something went wrong";
  res.status(500).send(message);
  next();
};

export default errorMiddleware;
