import { Router } from "express";
import {
  campaignDeleteController,
  campaignsCreateController,
  campaignsListController,
  campaignsListServiceByIdController,
  updateCampaignsController,
} from "../Controllers/campaigns.controller";

const campaignsRoutes = Router();

campaignsRoutes.post("", campaignsCreateController);
campaignsRoutes.get("", campaignsListController);
campaignsRoutes.get("/:id", campaignsListServiceByIdController);
campaignsRoutes.delete("/:id", campaignDeleteController);
campaignsRoutes.patch("/:id", updateCampaignsController);

export default campaignsRoutes;
