import "reflect-metadata";
import "express-async-errors";
import express from "express";
import volunteersRoutes from "./Router/volunteers.routes";
import handleErroMiddleware from "./Middlewares/handleErro.middleware";
import homelessRoutes from "./Router/homeless.routes";

import addressRouter from "./Router/address.routes";

const app = express();

app.use(express.json());

app.use("/teste", (resp, res) => {
  return res.status(201).json({ ok: "tudo ok" });
});

app.use(handleErroMiddleware);

app.use("/register", volunteersRoutes);
app.use("/homeless", homelessRoutes);
app.use("/address", addressRouter);

export default app;
