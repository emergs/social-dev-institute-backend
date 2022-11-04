import { Request, Response } from 'express'
import campaignsCreateService from '../Services/campaigns/campaignsCreate.service'
import campaignsDeleteService from '../Services/campaigns/campaignsDelete.service'
import campaignsListService from '../Services/campaigns/campaignsList.service'

const campaignsCreateController = async ( req: Request, res: Response) => {
    
    const data = req.body
   
    const createCampaigns = await campaignsCreateService (data)

    return res.status(201).json(createCampaigns)

}

const campaignsListController = async (req: Request, res: Response) => {

    const campaigns = await campaignsListService()

    return res.json(campaigns)
}

const campaignDeleteController = async (req: Request, res: Response) => {
    
    const id: string = req.params.id

    const campaign =  await campaignsDeleteService(id)
    
    return res.status(204).json({message: "Campaigns deleted with sucess!"})
}




export { campaignsCreateController, campaignsListController, campaignDeleteController }