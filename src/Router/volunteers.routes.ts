import { Router } from "express";
import { volunteersCreateController } from "../Controllers/volunteers.controller";

const volunteersRoutes = Router()

volunteersRoutes.post(
  "/volunteers",
  volunteersCreateController
)


export default volunteersRoutes