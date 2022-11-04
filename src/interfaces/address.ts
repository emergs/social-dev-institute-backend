import { ICampaigns } from "./campaigns";

export interface IAddress {
  id?: string;
  road: string;
  number?: string;
  complement?: string;
  city: string;
  state: string;
  campaigns_id?: ICampaigns;
}
