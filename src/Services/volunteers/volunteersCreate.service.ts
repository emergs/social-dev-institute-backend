import { hashSync } from "bcrypt";
import AppDataSource from "../../data-source"
import { Campaigns } from "../../entities/campaign.entities";
import Volunteers from "../../entities/volunteers.entities"
import { AppError } from "../../errors/appError";
import { IVolunteerRequest } from "../../interfaces/volunteers"

const volunteersCreateService = async (volunteer: IVolunteerRequest) => {

  const volunteersRepository = AppDataSource.getRepository(Volunteers)
  const campaignRepository = AppDataSource.getRepository(Campaigns)

  const campaign = await campaignRepository.findOne({
    where: {
      id: volunteer.campaigns_id
    }
  })

  if (!campaign) {
    throw new AppError(400, "Campaign not found")
  }

  const password = hashSync(volunteer.password, 10)

  const newVolunteer = new Volunteers()
  newVolunteer.name = volunteer.name
  newVolunteer.age = volunteer.age
  newVolunteer.cpf = volunteer.cpf
  newVolunteer.email = volunteer.email
  newVolunteer.telephone = volunteer.telephone
  newVolunteer.password = password

  volunteersRepository.create(newVolunteer)
  await volunteersRepository.save(newVolunteer)

  return newVolunteer

}

export default volunteersCreateService