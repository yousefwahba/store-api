import express, { Application } from "express";

const app: Application = express();
app.get("/", (req, res) => {
  res.send("hello world");
});
app.listen(3000, () => {
  console.log("server is starting at port 3000");
});

export default app;
