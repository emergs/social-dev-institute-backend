import { ICampaigns } from "./campaigns"

export interface IVolunteerRequest {
  name: string
  age: string
  cpf: string
  email: string
  telephone: string
  password: string
  campaigns_id: string
}

export interface IVolunteerLogin {
  email: string
  password: string
}