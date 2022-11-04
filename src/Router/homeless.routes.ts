import { Router } from "express";
import { createHomelessController, deleteHomelessController, getByIdController, listHomelessController, updateHomelessController } from "../Controllers/homeless.controllers";
import verifyIfHomelessExistsMiddleware from "../Middlewares/verifyIfHomelessExists.middleware";

const homelessRoutes = Router();

homelessRoutes.post('/register', verifyIfHomelessExistsMiddleware, createHomelessController);
homelessRoutes.get('', listHomelessController);
homelessRoutes.get('/:id', getByIdController);
homelessRoutes.patch('/:id', updateHomelessController);
homelessRoutes.delete('/:id', deleteHomelessController);

export default homelessRoutes;