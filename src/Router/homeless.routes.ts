import { Router } from "express";
import { createHomelessController } from "../Controllers/homeless.controllers";
import verifyIfHomelessExistsMiddleware from "../Middlewares/verifyIfHomelessExists.middleware";

const homelessRoutes = Router();

homelessRoutes.post('', verifyIfHomelessExistsMiddleware, createHomelessController);

export default homelessRoutes;