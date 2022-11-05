import "reflect-metadata";
import "express-async-errors";
import express from "express";
import institutionRoutes from "./Router/institutions.routes";
import volunteersRoutes from "./Router/volunteers.routes";
import sessionRoutes from "./Router/sessions.routes";
import handleErroMiddleware from "./Middlewares/handleErro.middleware";
import homelessRoutes from "./Router/homeless.routes";
import addressRouter from "./Router/address.routes";

const app = express();
app.use(express.json());

app.use("/login", sessionRoutes);
app.use('/register/institution', institutionRoutes);
app.use("/homeless", homelessRoutes);
app.use("/address", addressRouter);
app.use("/volunteers", volunteersRoutes);
app.use(handleErroMiddleware)

export default app;
