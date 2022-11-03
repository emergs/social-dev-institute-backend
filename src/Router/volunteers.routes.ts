import { Router } from "express";
import { volunteersCreateController } from "../Controllers/volunteers.controller";
import verifyVoluntaryExists from "../Middlewares/verifyVoluntaryExists";

const volunteersRoutes = Router()

volunteersRoutes.post(
  "/voluntary",
  verifyVoluntaryExists,
  volunteersCreateController
)


export default volunteersRoutes