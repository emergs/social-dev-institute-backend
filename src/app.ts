import "reflect-metadata";
import "express-async-errors";
import express from "express";
import institutionRoutes from "./Router/institution.routes";

const app = express();
app.use(express.json());
app.use('/register/institution',institutionRoutes);

export default app;
