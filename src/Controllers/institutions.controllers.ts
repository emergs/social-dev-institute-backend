import { Request, Response } from "express"
import createInstitutionService from "../Services/institutions/createInstitution.service"
import deleteInstitutionService from "../Services/institutions/deleteInstitution.service"
import updateInstitutionService from "../Services/institutions/updateInstitution.service"

const createInstitutionController = async (req:Request, res:Response)=>{
  const data = req.body
  const institution = await createInstitutionService(data)
  res.status(201).json(institution)
}

const updateInstitutionController = async (req:Request, res:Response)=>{
  const id = req.user.id
  const data = req.body
  const institution = await updateInstitutionService(id,data)
  res.status(200).json(institution)
}

const deleteInstitutionController = async (req:Request, res:Response)=>{
  const id = req.user.id
  const institution = await deleteInstitutionService(id)
  res.status(204).send()
}

export {createInstitutionController, updateInstitutionController, deleteInstitutionController}