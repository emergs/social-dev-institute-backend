import AppDataSource from '../../data-source'
import { Address } from '../../entities/address.entities'
import { Campaigns } from '../../entities/campaign.entities'
import { Institutions } from '../../entities/institutions.entity'
import { AppError } from '../../errors/appError'
import { IAddress } from '../../interfaces/address'
import { ICampaigns } from '../../interfaces/campaigns'

const campaignsCreateService = async(data: ICampaigns) => {
    const addressRepository = AppDataSource.getRepository(Address)
    const campaignsRepository = AppDataSource.getRepository(Campaigns)
    const institutionRepository = AppDataSource.getRepository(Institutions)

    const { name, isAlive, address, institutionId } = data
    
    const institution = await institutionRepository.findOneBy({id: institutionId})
    if(!institution){
      throw new AppError(404, "Institution no existe")
    }
    
   // Não deve permitir uma mesma instituição cadastrar uma campanha com um nome já criado por ela
   const campaigns = await campaignsRepository.findOneBy({name: name})
    if(campaigns){
      throw new AppError(404, "Campaign already exists")
   
    }
   // cadastrar mais de um endereço

    const newAddress: IAddress = addressRepository.create({...address})
    
    await addressRepository.save(newAddress)

    const campaign = {

      name,
      isAlive,
      address: newAddress,
      institution: institution,
      date_creation: new Date(),
      date_update: new Date(),
        
    }

    const newCampaigns = campaignsRepository.create(campaign)
    await campaignsRepository.save(newCampaigns)
    return newCampaigns
}

export default campaignsCreateService
