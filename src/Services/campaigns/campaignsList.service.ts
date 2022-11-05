import AppDataSource from '../../data-source'
import { Campaigns } from '../../entities/campaign.entities'

const campaignsListService = async(): Promise<Campaigns[]> => {
    
    const campaignsRepository = AppDataSource.getRepository(Campaigns)

    const campaigns = await campaignsRepository .find()

    return campaigns
}

export default campaignsListService