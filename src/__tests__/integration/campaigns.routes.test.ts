import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { mockedCampaignInvalidInstitutionId, mockedCampaigns, mockedCampaignsInvalidStat } from "../mocks/campaigns.mocks";
import { mockedInstitutionLogin, mockedVolunteersLogin } from "../mocks/login.mocks";
import { mockedInstitution } from "../mocks/institutions.mocks";
import { volunteerRequest } from "../mocks/volunteers.mocks.";

describe("/campaign", () => {
    let connection: DataSource

    let institution: any;
    let volunteer: any;

    beforeAll(async () => {
        await AppDataSource.initialize().then((res) => {
            connection = res;
        })
        .catch((error) => {
            console.log(error)
        });
        volunteer = await request(app)
      .post("/volunteers/register")
      .send(volunteerRequest);
    institution = await request(app)
      .post("/register/institution")
      .send(mockedInstitution);
        
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /campaign -> Deve permitir cadastrar uma campanha", async () => {

        const institution = await request(app).get('/register/institution')
        const institutionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        mockedCampaigns.institutionId = institution.body[0].id
        const response = await request(app).post('/campaign').set("Authorization", `Bearer ${institutionLoginResponse.body.token}`).send(mockedCampaigns)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("institution")
        expect(response.body).toHaveProperty("date_creation")
        expect(response.body).toHaveProperty("date_update")
        expect(response.body).toHaveProperty("address")
        expect(response.body.address[0]).toHaveProperty("road")
        expect(response.body.address[0]).toHaveProperty("number")
        expect(response.body.address[0]).toHaveProperty("complement")
        expect(response.body.address[0]).toHaveProperty("city")
        expect(response.body.address[0]).toHaveProperty("state")
        expect(response.status).toBe(201)
    })

    test("POST /campaign ->  não deve ser capaz de criar uma campanha que já existe",async () => {
        const institutions = await request(app).get('/register/institution')
        const intitutuionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        mockedCampaigns.institutionId = institutions.body[0].id
        const response = await request(app).post('/campaign').set("Authorization", `Bearer ${intitutuionLoginResponse.body.token}`).send(mockedCampaigns)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
     
    })

    test("POST /campaign ->  não deve ser capaz de criar campanha não sendo instituição",async () => {
        const institutions = await request(app).get('/register/institution')
        const  userLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        mockedCampaigns.institutionId = institutions.body[0].id
        const response = await request(app).post('/campaign').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedCampaigns)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
     
    })

    test("POST /campaign ->  não deve ser capaz de criar campanha sem autenticação",async () => {
        const institutions = await request(app).get('/campaign')
        mockedCampaigns.institutionId = institutions.body[0].id
        const response = await request(app).post('/campaign').send(mockedCampaigns)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("POST /campaign -  não deve ser capaz de criar campanha com institutionId inválido",async () => { 
        const intitutionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        const response = await request(app).post('/campaign').set("Authorization", `Bearer ${intitutionLoginResponse.body.token}`).send(mockedCampaignInvalidInstitutionId)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
     
    })

    test("POST /campaign ->  não deve ser capaz de criar uma campanha com estado inválido",async () => {
        const institutions = await request(app).get('/register/institution')
        const institutionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        mockedCampaignsInvalidStat.institutionId = institutions.body[0].id
        const response = await request(app).post('/campaign').set("Authorization", `Bearer ${institutionLoginResponse.body.token}`).send(mockedCampaignsInvalidStat)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
     
    })

    test("GET /campaign -> Deve ser capaz de listar todas as campanhas",async () => {
        const response = await request(app).get('/campaign')
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
     
    })

    test("DELETE /campaign/:id -> não deve ser capaz de excluir campanha sem autenticação",async () => {
        const institutioLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        const InstitutionTobeDeleted = await request(app).get('/campaign').set("Authorization", `Bearer ${institutioLoginResponse.body.token}`)

        const response = await request(app).delete(`/campaign/${InstitutionTobeDeleted.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("DELETE /campaigns/:id ->  Deve ser capaz de fazer a exclusão soft delete da campanha",async () => {
        await request(app).post('/campaign').send(mockedInstitution)

        const institutionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        const CampaignTobeDeleted = await request(app).get('/campaign').set("Authorization", `Bearer ${institutionLoginResponse.body.token}`)

        const response = await request(app).delete(`/campaign/${CampaignTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${institutionLoginResponse.body.token}`)
        const findUser = await request(app).get('/campaign').set("Authorization", `Bearer ${institutionLoginResponse.body.token}`)
        expect(response.status).toBe(204)
        expect(findUser.body[0].isActive).toBe(false)
     
    })

    test("DELETE /campaign/:id -> -  não deve ser capaz de excluir a campanha com isActive = false",async () => {
        await request(app).post('/campaign').send(mockedInstitution)

        const institutionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        const CampaignTobeDeleted = await request(app).get('/campaign').set("Authorization", `Bearer ${institutionLoginResponse.body.token}`)

        const response = await request(app).delete(`/campaign/${CampaignTobeDeleted.body[0].id}`).set("Authorization", `Bearer ${institutionLoginResponse.body.token}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("message")
     
    })

    test("DELETE ->  não deve ser capaz de excluir usuário com id inválido",async () => {
        await request(app).post('/campaign').send(mockedInstitution)

        const institutionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        
        const response = await request(app).delete(`/campaign/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization", `Bearer ${institutionLoginResponse.body.token}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
     
    })

    test("PATCH /campaign/:id ->  não deve ser capaz de atualizar a campanha sem autenticação",async () => {
        const institutionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        const CampaignTobeUpdate = await request(app).get('/campaign').set("Authorization", `Bearer ${institutionLoginResponse.body.token}`)
        const response = await request(app).patch(`/campaign/${CampaignTobeUpdate.body[0].id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
             
    })

    test("PATCH /campaigns/:id -> não deve ser capaz de atualizar a campanha com id inválido",async () => {
        const newValues = {name: "Instituto da Criança", address: [{ city: "Campos", state: "PR"}], institutionId:""} 

        const institutionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        const token = `Bearer ${institutionLoginResponse.body.token}`
        
        const campaignTobeUpdateRequest = await request(app).get("/campaign").set("Authorization", token)
        const campaignTobeUpdateId = campaignTobeUpdateRequest.body[0].id

        const response = await request(app).patch(`/campaign/13970660-5dbe-423a-9a9d-5c23b37943cf`).set("Authorization",token).send(newValues)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

})


