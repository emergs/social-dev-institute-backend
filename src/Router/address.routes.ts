import { Router } from "express";
import {
  addressByIdController,
  addressUpdateController,
  allAddressController,
} from "../Controllers/address.controllers";

const addressRouter = Router();

addressRouter.get("", allAddressController);
addressRouter.get("/:id", addressByIdController);
addressRouter.patch("/:id", addressUpdateController);

export default addressRouter;
