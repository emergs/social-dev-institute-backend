import { Router } from "express";
import { volunteersCreateController, volunteersListController, volunteersUpdateController } from "../Controllers/volunteers.controller";
import verifyVoluntaryExists from "../Middlewares/verifyVoluntaryExists";

const volunteersRoutes = Router()

volunteersRoutes.post(
  "/voluntary",
  verifyVoluntaryExists,
  volunteersCreateController
)

volunteersRoutes.get(
  "",
  volunteersListController
)

volunteersRoutes.patch(
  "/:id",
  volunteersUpdateController
)


export default volunteersRoutes