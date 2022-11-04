import AppDataSource from '../../data-source'
import { Institutions } from '../../entities/institutions.entity'

const deleteInstitutionService = async(id:string)=>{
  const institutionRepository = AppDataSource.getRepository(Institutions)
  const institution = await institutionRepository.findOneBy({id})
  
  await institutionRepository.remove(institution!)
}

export default deleteInstitutionService