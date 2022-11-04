import AppDataSource from '../../data-source'
import { Institutions } from '../../entities/institutions.entity'
import { IInstitutions } from '../../interfaces/institutions'

const createInstitutionService = async({name, cnpj, address, phone, email, password}:IInstitutions):Promise<Institutions> =>{
  const institutionRepository = AppDataSource.getRepository(Institutions)
  
  const newInstitution = institutionRepository.create({
    name,
    cnpj,
    address,
    phone,
    email,
    password
  })

  await institutionRepository.save(newInstitution)

  return newInstitution
}

export default createInstitutionService