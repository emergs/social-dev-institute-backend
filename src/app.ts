import "reflect-metadata";
import "express-async-errors";
import express from "express";
import volunteersRoutes from "./Router/volunteers.routes";

const app = express();
app.use(express.json());

app.use("/register", volunteersRoutes)

app.use("/teste", (resp, res) => {
  return res.status(201).json({ ok: "tudo ok" });
});

export default app;
