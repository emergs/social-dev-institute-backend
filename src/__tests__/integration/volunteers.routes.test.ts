import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { volunteerOK } from "../mocks/volunteers.mocks.";

describe("Cadastra um voluntário", () => {

  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then(res => {
        connection = res
      })
      .catch(error => {
        console.log(error)
      })
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("POST /register/voluntary -> Deve permitir o cadastro de um voluntário", async () => {

    const resultVoluntary = await request(app).post("/register/voluntary").send(volunteerOK)

    expect(resultVoluntary.status).toBe(201)
    expect(resultVoluntary.body).toHaveProperty("id")
    expect(resultVoluntary.body).toHaveProperty("cpf")
    expect(resultVoluntary.body).toHaveProperty("age")
    expect(resultVoluntary.body).toHaveProperty("name")
    expect(resultVoluntary.body).toHaveProperty("email")
    expect(resultVoluntary.body).toHaveProperty("telephone")
    expect(resultVoluntary.body).not.toHaveProperty("password")

  })
})