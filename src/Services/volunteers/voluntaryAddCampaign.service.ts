import AppDataSource from "../../data-source"
import { Campaigns } from "../../entities/campaign.entities"
import VolunteerCampaigns from "../../entities/volunteerCampaigns.entities"
import Volunteers from "../../entities/volunteers.entities"
import { AppError } from "../../errors/appError"

const voluntaryAddCampaignService = async (voluntary_id: string, campaign_id: string) => {
  const voCamRepository = AppDataSource.getRepository(VolunteerCampaigns)
  const voluntaryRepository = AppDataSource.getRepository(Volunteers)
  const campaignRepository = AppDataSource.getRepository(Campaigns)

  const voluntary = await voluntaryRepository.findOne({
    where: {
      id: voluntary_id
    }
  })

  if (!voluntary) {
    throw new AppError(401, "Voluntary not found")
  }

  const campaign = await campaignRepository.findOne({
    where: {
      id: campaign_id
    }
  })

  if (!campaign) {
    throw new AppError(401, "Campaign not found")
  }

  const newVoluntaryInCampaign = new VolunteerCampaigns()
  newVoluntaryInCampaign.volunteer_id = voluntary
  newVoluntaryInCampaign.campaigns_id = campaign

  voCamRepository.create(newVoluntaryInCampaign)
  await voCamRepository.save(newVoluntaryInCampaign)

  return newVoluntaryInCampaign

}

export default voluntaryAddCampaignService