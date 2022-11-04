import { Router } from 'express'
import { createInstitutionController, deleteInstitutionController, updateInstitutionController } from '../Controllers/institutions.controllers'
import verifyCNPJAndEmailMiddleware from '../Middlewares/verifyCNPJAndEmailInstitutions.middleware'

const institutionRoutes = Router()

institutionRoutes.post('', verifyCNPJAndEmailMiddleware, createInstitutionController)
institutionRoutes.patch('profile', updateInstitutionController)
institutionRoutes.delete('profile', deleteInstitutionController)


export default institutionRoutes