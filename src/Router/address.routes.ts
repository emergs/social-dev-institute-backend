import { Router } from "express";
import {
  addressByIdController,
  allAddressController,
} from "../Controllers/address.controllers";

const addressRouter = Router();

addressRouter.get("", allAddressController);
addressRouter.get("/:id", addressByIdController);

export default addressRouter;
