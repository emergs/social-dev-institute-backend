import { Router } from 'express'
import { createInstitutionController, deleteInstitutionController, updateInstitutionController } from '../Controllers/institutions.controllers'

const institutionRoutes = Router()

institutionRoutes.post('', createInstitutionController)
institutionRoutes.patch('profile', updateInstitutionController)
institutionRoutes.delete('profile', deleteInstitutionController)


export default institutionRoutes