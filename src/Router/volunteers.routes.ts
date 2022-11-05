import { Router } from "express";
import { volunteersCreateController, volunteersDeleteController, volunteersListController, volunteersLoginController, volunteersUpdateController } from "../Controllers/volunteers.controller";
import verifyTokenVoluntaryMiddleware from "../Middlewares/verifyTokenVoluntary.middleware";
import verifyVoluntaryExists from "../Middlewares/verifyVoluntaryExists";

const volunteersRoutes = Router()

volunteersRoutes.post(
  "/register",
  verifyVoluntaryExists,
  volunteersCreateController
)

volunteersRoutes.post(
  "/login",
  volunteersLoginController
)

volunteersRoutes.get(
  "",
  verifyTokenVoluntaryMiddleware,
  volunteersListController
)

volunteersRoutes.patch(
  "/:id",
  verifyTokenVoluntaryMiddleware,
  volunteersUpdateController
)

volunteersRoutes.delete(
  "/:id",
  verifyTokenVoluntaryMiddleware,
  volunteersDeleteController
)


export default volunteersRoutes