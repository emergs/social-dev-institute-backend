import AppDataSource from '../../data-source'

const deleteInstitutionService = (id:string)=>{
  const repo = AppDataSource.getRepository()
  const data = repo.findOneBy({id})
}

export default deleteInstitutionService