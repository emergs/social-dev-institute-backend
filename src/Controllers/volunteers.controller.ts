
import { Request, Response } from "express"
import { IVolunteerRequest } from "../interfaces/volunteers"
import voluntaryAddCampaignService from "../Services/volunteers/voluntaryAddCampaign.service"
import voluntaryListService from "../Services/volunteers/voluntaryList.service"
import volunteersCreateService from "../Services/volunteers/volunteersCreate.service"
import volunteersDeleteService from "../Services/volunteers/volunteersDelete.service"
import volunteersListService from "../Services/volunteers/volunteersList.service"
import volunteerLoginService from "../Services/volunteers/volunteersLogin.service"
import volunteersUpdateService from "../Services/volunteers/volunteersUpdate.service"


const volunteersCreateController = async (req: Request, res: Response) => {
  const volunteer = req.body;

  const volunteerCreated = await volunteersCreateService(volunteer);

  const volunteerVisible = {
    id: volunteerCreated.id,
    name: volunteerCreated.name,
    age: volunteerCreated.age,
    email: volunteerCreated.email,
    cpf: volunteerCreated.cpf,
    telephone: volunteerCreated.telephone,
  }


  return res.status(201).json(volunteerVisible);
};

const volunteersLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await volunteerLoginService({ email, password });

  return res.status(200).json({ token });
};

const volunteersListController = async (req: Request, res: Response) => {
  const volunteers = await volunteersListService();

  const newArray = volunteers.map((voluntary) => {
    const newVoluntary = {
      id: voluntary.id,
      name: voluntary.name,
      age: voluntary.age,
      email: voluntary.email,
      cpf: voluntary.cpf,
      telephone: voluntary.telephone,
      volunteerCampaigns: voluntary.volunteerCampaigns
    }

    return newVoluntary
  })


  return res.status(200).json(newArray);
};

const volunteersUpdateController = async (req: Request, res: Response) => {
  const voluntary: IVolunteerRequest = req.body;
  const id: string = req.params.id;

  const updatedUser = await volunteersUpdateService(id, voluntary);

  return res.status(200).json(updatedUser);
};

const volunteersDeleteController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const voluntaryDeleted = await volunteersDeleteService(id);
  return res.status(204).json({
    message: "Voluntary deleted",
  });
};

const voluntaryListController = async (req: Request, res: Response) => {
  const { id } = req.params;

  const voluntary = await voluntaryListService(id);

  const newVoluntary = {
    id: voluntary.id,
    name: voluntary.name,
    age: voluntary.age,
    email: voluntary.email,
    cpf: voluntary.cpf,
    telephone: voluntary.telephone

  }
  return res.status(200).json(newVoluntary)

}


const voluntaryAddCampaignController = async (req: Request, res: Response) => {
  const companign_id = req.params.id
  const voluntary_id = req.user.id

  const companignAdd = await voluntaryAddCampaignService(voluntary_id, companign_id)

  const voluntaryCampaign = {
    voluntaryId: companignAdd.volunteer_id.id,
    voluntaryName: companignAdd.volunteer_id.name,
    voluntaryEmail: companignAdd.volunteer_id.email,
    voluntaryTelephone: companignAdd.volunteer_id.telephone,

    campaignId: companignAdd.campaigns_id.id,
    campaignName: companignAdd.campaigns_id.name
  }

  return res.status(201).json(voluntaryCampaign)
}

export {
  volunteersCreateController,
  volunteersListController,
  volunteersUpdateController,
  volunteersLoginController,
  volunteersDeleteController,
  voluntaryListController,
  voluntaryAddCampaignController
}

