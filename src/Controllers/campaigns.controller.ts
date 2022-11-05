import { Request, Response } from "express";
import campaignsCreateService from "../Services/campaigns/campaignsCreate.service";
import campaignsDeleteService from "../Services/campaigns/campaignsDelete.service";
import campaignsListService from "../Services/campaigns/campaignsList.service";
import campaignsListServiceById from "../Services/campaigns/campaignsListById.service";
import updateCampaignsService from "../Services/campaigns/campaignsUpdate.service";

const campaignsCreateController = async (req: Request, res: Response) => {
  const data = req.body;

  const createCampaigns = await campaignsCreateService(data);

  return res.status(201).json(createCampaigns);
};

const campaignsListController = async (req: Request, res: Response) => {
  const campaigns = await campaignsListService();

  return res.json(campaigns);
};

const campaignsListServiceByIdController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const campaigns = await campaignsListServiceById(id);

  return res.json(campaigns);
};

const campaignDeleteController = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const campaign = await campaignsDeleteService(id);

  return res.status(204).json({ message: "Campaigns deleted with sucess!" });
};

const updateCampaignsController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const { name, institution } = req.body;

  const campaign = await updateCampaignsService(name, id, institution);

  return res.status(200).json(campaign);
};

export {
  campaignsCreateController,
  campaignsListController,
  campaignDeleteController,
  campaignsListServiceByIdController,
  updateCampaignsController,
};
