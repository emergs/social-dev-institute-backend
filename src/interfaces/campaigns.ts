import { IAddress } from "./address";

export interface ICampaignsRequest {
  name: string;
}

export interface ICampaigns {
  id: string;
  name: string;
  isAlive: boolean;
  date_creation: string;
  date_update: string;
}

export interface ICampaignsCreate extends ICampaigns {
  address: IAddress;
}
