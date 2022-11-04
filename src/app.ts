import "reflect-metadata";
import "express-async-errors";
import express from "express";
import volunteersRoutes from "./Router/volunteers.routes";

import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/appError";
import sessionRoutes from "./Router/sessions.routes";

const app = express();
app.use(express.json());

app.use("/register", volunteersRoutes);

app.use("/teste", (resp, res) => {
  return res.status(201).json({ ok: "tudo ok" });
});
app.use("/login", sessionRoutes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
