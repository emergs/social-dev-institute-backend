import { DataSource } from 'typeorm'
import app from '../../app'
import AppDataSource from '../../data-source'
import request from 'supertest'
import { mockedInstitution } from '../mocks/institutions.mocks'

describe("/register/institution", () => {
  let connection: DataSource

  beforeAll(async() => {
      await AppDataSource.initialize().then((res) => {
          connection = res
      }).catch((err) => {
          console.error("Error during Data Source initialization", err)
      })
  })

  afterAll(async() => {
      await connection.destroy()
  })

  test("POST /register/institution -  Deve permitir cadastrar uma instituição",async () => {
      const response = await request(app).post('/users').send(mockedInstitution)

      expect(response.body).toHaveProperty("id")
      expect(response.body).toHaveProperty("name")
      expect(response.body).toHaveProperty("email")
      expect(response.body).toHaveProperty("address")
      expect(response.body).toHaveProperty("cnpj")
      expect(response.body).toHaveProperty("phone")
      //expect(response.body).not.toHaveProperty("password")
      expect(response.body.name).toEqual("Billy")
      expect(response.body.email).toEqual("billy@mail.com")
      expect(response.body.cnpj).toEqual("12345678912345")
      expect(response.status).toBe(201)        
  })

 