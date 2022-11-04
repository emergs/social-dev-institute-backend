import "reflect-metadata";
import "express-async-errors";
import express from "express";
import institutionRoutes from "./Router/institutions.routes";
import volunteersRoutes from "./Router/volunteers.routes";
import handleErroMiddleware from "./Middlewares/handleErro.middleware";
import homelessRoutes from "./Router/homeless.routes";

<<<<<<< HEAD
import addressRouter from "./Router/address.routes";

=======
>>>>>>> 98a6e98 (fix: alteração das interfaces)
const app = express();

app.use(express.json());

app.use("/register", volunteersRoutes)
app.use('/register/institution',institutionRoutes);
app.use("/register", volunteersRoutes);
app.use("/homeless", homelessRoutes);
app.use("/address", addressRouter);

app.use(handleErroMiddleware);

export default app;
