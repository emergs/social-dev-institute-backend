import { ICampaigns } from "../../interfaces/campaigns";

export const mockedCampaigns: ICampaigns = {
    name: "Ana",
    isAlive: true,
    address: [{
        road: "Rua Paraná",
        number: "123",
        complement: "ao lado do supermercado",
        city: "Curitiba",
        state: "PR"
        
    }],
    instituitionId: ""
}

export const mockedCampaignInvalidInstitutionId : ICampaigns = {
    name: "Ana",
    isAlive: true,
    address: [{
        road: "Rua Paraná",
        number: "123",
        complement: "ao lado do supermercado",
        city: "Curitiba",
        state: "PR"
        
    }],
    instituitionId: "8f9ae6ce-e36c-4d9d-9bd7-b4c98cb4e4f4"

}

export const mockedCampaignsInvalidStat: ICampaigns = {
    name: "Ana",
    isAlive: true,
    address: [{
        road: "Rua Paraná",
        number: "123",
        complement: "ao lado do supermercado",
        city: "Curitiba",
        state: "PRGO"
        
    }],
    instituitionId: ""
}


