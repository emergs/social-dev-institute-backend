import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";

describe("Ler os endereços", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((error) => {
        // console.error("Erro na inicialização", error);
        console.log(error);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("GET /address -> Deve permitir ver todos os endereçõs", async () => {
    const response = await request(app).get("/address");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("GET /address/:id -> Deve permitir ver um endereço especifico", async () => {
    const response = await request(app).get("/address/:id");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("road");
    expect(response.body).toHaveProperty("number");
    expect(response.body).toHaveProperty("complement");
    expect(response.body).toHaveProperty("city");
    expect(response.body).toHaveProperty("state");
  });

  test("GET /address/:id -> Deve disparar um erro de id não encontrado", async () => {
    const response = await request(app).get("/address/:id");

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: "error",
        statusCode: 404,
        message: "id not found",
      })
    );
  });
});
