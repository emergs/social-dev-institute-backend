import { Router } from "express";
import { campaignsCreateController } from "../Controllers/campaigns.controller";

const campaignsRoutes = Router()

campaignsRoutes.post("/campaigns", campaignsCreateController)
