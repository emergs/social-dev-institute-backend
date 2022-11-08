import AppDataSource from '../../data-source'
import { Institutions } from '../../entities/institutions.entity';
import { AppError } from '../../errors/appError';

const listAllInstitutionsService = async()=>{
  const institutionsRepository = AppDataSource.getRepository(Institutions)
  const institutions = institutionsRepository.find()

  if(!institutions){
    throw new AppError(400,'No registered institution');
  }

  return institutions
}

export default listAllInstitutionsService