import AppDataSource from '../../data-source'

const updateInstitutionService = (id:string)=>{
  const repo = AppDataSource.getRepository()
  const data = repo.findOneBy({id})
}

export default updateInstitutionService