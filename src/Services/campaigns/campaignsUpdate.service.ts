import AppDataSource from "../../data-source"
import { AppError } from "../../errors/appError"
import { Campaigns } from "../../entities/campaign.entities"
import { ICampaignsRequest } from "../../interfaces/campaigns"

const updateCampaignsService = async({ name }: ICampaignsRequest, id: string ): Promise<Campaigns> => {
    const campaignsRepository = AppDataSource.getRepository(Campaigns)
    const findCampaigns = await campaignsRepository.findOneBy({
        id
    })

    if(!findCampaigns){
        throw new AppError(404, 'User not found')
    }

    await campaignsRepository.update(
        id,
        {
            id: findCampaigns.id,
            name:name ? name : findCampaigns.name,
            isAlive: findCampaigns.isAlive
        }
    )    
        const campaign = await campaignsRepository.findOneBy({  // instituição
            id
        })
    return campaign!
}

export default updateCampaignsService