import AppDataSource from "../../data-source"
import { Campaigns } from "../../entities/campaign.entities"
import { AppError } from "../../errors/appError"
    
    
    const campaignsDeleteService = async (id: string): Promise<void> => {
    
        const campaignsRepository = AppDataSource.getRepository(Campaigns)
        const findCampaigns = await campaignsRepository.findOneBy({
            id
        })
        
        if(!findCampaigns){
            throw new AppError(404, 'User is already inactive')
            
        }
        
        if(!findCampaigns?.isAlive) {
            throw new AppError(400, 'User is already inactive')
           
        }
        
        await campaignsRepository.update(
            id,
            {
                isAlive: false
            }
        )    
        
    }
    
    export default campaignsDeleteService