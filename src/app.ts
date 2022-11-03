import "reflect-metadata";
import "express-async-errors";
import express from "express";
import volunteersRoutes from "./Router/volunteers.routes";
import handleErroMiddleware from "./Middlewares/handleErro.middleware";
import homelessRoutes from "./Router/homeless.routes";

const app = express();

app.use(express.json());

app.use("/register", volunteersRoutes)

app.use("/teste", (resp, res) => {
  return res.status(201).json({ ok: "tudo ok" });
});

app.use('/homeless', homelessRoutes);

app.use(handleErroMiddleware)


export default app;
