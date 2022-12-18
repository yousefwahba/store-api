import express, { Application, Request, Response } from "express";
import errorMiddleware from "./middleware/error.middleware";
import routes from "./routes";
import config from "./config";
import db from "./database";

const app: Application = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", routes);
app.use(errorMiddleware);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Route not found!",
  });
});

app.listen(3000, () => {
  console.log(`server is starting at port ${config.port || 3000} `);
});

export default app;
