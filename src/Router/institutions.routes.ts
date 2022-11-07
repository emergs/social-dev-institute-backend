import { Router } from 'express'
import { createInstitutionController, deleteInstitutionController, listAllInstitutionsController, updateInstitutionController } from '../Controllers/institutions.controllers'
import verifyCNPJAndEmailMiddleware from '../Middlewares/verifyCNPJAndEmailInstitutions.middleware'
import verifyTokenVoluntaryMiddleware from '../Middlewares/verifyTokenVoluntary.middleware'

const institutionRoutes = Router()

institutionRoutes.post('', verifyCNPJAndEmailMiddleware, createInstitutionController)
institutionRoutes.get('', listAllInstitutionsController)
institutionRoutes.patch('/profile', verifyTokenVoluntaryMiddleware, updateInstitutionController)
institutionRoutes.delete('/profile', verifyTokenVoluntaryMiddleware, deleteInstitutionController)


export default institutionRoutes