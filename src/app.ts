import "reflect-metadata";
import "express-async-errors";
import express from "express";

import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/appError";
import homelessRoutes from "./Router/homeless.routes";

const app = express();
app.use(express.json());

app.use("/teste", (resp, res) => {
  return res.status(201).json({ ok: "tudo ok" });
});

app.use('/homeless', homelessRoutes);

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
