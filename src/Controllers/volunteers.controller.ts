import { Request, Response } from "express"
import volunteersCreateService from "../Services/volunteers/volunteersCreate.service"

const volunteersCreateController = async (req: Request, res: Response) => {
  const volunteer = req.body

  const volunteerCreated = await volunteersCreateService(volunteer)

  const volunteerVisible = {
    id: volunteerCreated.id,
    name: volunteerCreated.name,
    age: volunteerCreated.age,
    email: volunteerCreated.email,
    cpf: volunteerCreated.cpf,
    telephone: volunteerCreated.telephone
  }

  return res.status(201).json({ volunteerVisible })
}

export { volunteersCreateController }