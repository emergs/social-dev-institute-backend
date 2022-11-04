import { Router } from "express";
import { createHomelessController, getByIdController, listHomelessController } from "../Controllers/homeless.controllers";
import verifyIfHomelessExistsMiddleware from "../Middlewares/verifyIfHomelessExists.middleware";

const homelessRoutes = Router();

homelessRoutes.post('', verifyIfHomelessExistsMiddleware, createHomelessController);
homelessRoutes.get('', listHomelessController);
homelessRoutes.get('/:id', getByIdController);

export default homelessRoutes;