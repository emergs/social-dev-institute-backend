import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { ICampaigns } from "../../interfaces/campaigns";
import { mockedCampaignInvalidInstitutionId, mockedCampaigns, mockedCampaignsInvalidStat } from "../mocks/campaigns.mocks";
import { mockedInstitutionLogin } from "../mocks/login.mocks";

describe("/campaign", () => {
    let connection: DataSource

    beforeAll(async () => {
        await AppDataSource.initialize().then((res) => {
            connection = res;
        })
        .catch((error) => {
            console.log(error)
        });
        
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /campaigns -> Deve permitir cadastrar uma campanha", async () => {

        const institution = await request(app).get('/register/institution')
        const institutionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        const resultAlive = await request(app).post("/campaigns").send(mockedCampaigns)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("isAlive")
        expect(response.body).toHaveProperty("institutionId")
        expect(response.body).toHaveProperty("date_creation")
        expect(response.body).toHaveProperty("date_updated")
        expect(response.body).toHaveProperty("address")
        expect(response.body.address).toHaveProperty("id")
        expect(response.body.address).toHaveProperty("road")
        expect(response.body.address).toHaveProperty("number")
        expect(response.body.address).toHaveProperty("complement")
        expect(response.body.address).toHaveProperty("city")
        expect(response.body.address).toHaveProperty("state")
        expect(response.status).toBe(201)
    })

    test("POST /campaigns ->  não deve ser capaz de criar uma campanha que já existe",async () => {
        const institutions = await request(app).get('/register/institution')
        const intitutuionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        mockedCampaigns.institutionId = institutions.body[0].id
        const response = await request(app).post('/campaigns').set("Authorization", `Bearer ${intitutuionLoginResponse.body.token}`).send(mockedCampaigns)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
     
    })

    test("POST /campaigns ->  não deve ser capaz de criar campanha não sendo instituição",async () => {
        const institutions = await request(app).get('/register/institution')
        const  userLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        mockedCampaigns.institutionId = institutions.body[0].id
        const response = await request(app).post('/campaigns').set("Authorization", `Bearer ${userLoginResponse.body.token}`).send(mockedCampaigns)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(403)
     
    })

    test("POST /campaigns ->  não deve ser capaz de criar campanha sem autenticação",async () => {
        const institutions = await request(app).get('/campaigns')
        mockedCampaigns.institutionId = institutions.body[0].id
        const response = await request(app).post('/campaigns').send(mockedCampaigns)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
     
    })

    test("POST /campaigns -  não deve ser capaz de criar campanha com institutionId inválido",async () => { 
        const intitutionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        const response = await request(app).post('campaigns').set("Authorization", `Bearer ${intitutionLoginResponse.body.token}`).send(mockedCampaignInvalidInstitutionId)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
     
    })

    test("POST /campaigns ->  njão deve ser capaz de criar uma campanha com estado inválido",async () => {
        const institutions = await request(app).get('/categories')
        const institutionLoginResponse = await request(app).post("/login").send(mockedInstitutionLogin);
        mockedCampaignsInvalidStat.institutionId = institutions.body[0].id
        const response = await request(app).post('campaigns').set("Authorization", `Bearer ${institutionLoginResponse.body.token}`).send(mockedCampaignsInvalidStat)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
     
    })

    test("GET /campaigns -> Deve ser capaz de listar todas as campanhas",async () => {
        const response = await request(app).get('/campaigns')
        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
     
    })

})


