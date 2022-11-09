import request from "supertest";
import app from "../../app";
import { DataSource } from "typeorm";
import AppDataSource from "../../data-source";
import { createInstitution, homelessData, institutionLogin } from "../mocks/homeless.mocks";

describe('Testando rotas homeless', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize().then(res => {
      connection = res;
    }).catch(error => {
      console.log(error);
    });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('POST /homeless/register => Não deve ser capaz de criar um homeless sem autenticação', async () => {
    const response = await request(app).post('/homeless/register').send(homelessData);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('POST /register/institution => Deve criar uma instituição', async () => {
    const response = await request(app).post('/register/institution').send(createInstitution);
    
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('cnpj');
    expect(response.body).toHaveProperty('address');
    expect(response.body).toHaveProperty('phone');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('name');
    expect(response.status).toBe(201);
    expect(response.body).not.toHaveProperty('password');
  });

  test('POST /homeless/register => Deve ser capaz de criar um homeless', async () => {
    const institutionLoginResponse = await request(app).post('/login').send(institutionLogin);
    const token = institutionLoginResponse.body.token;

    const createdHomeless = await request(app).post('/homeless/register').set('Authorization', `Bearer ${token}`).send(homelessData);

    expect(createdHomeless.status).toBe(201);
    expect(createdHomeless.body).toHaveProperty('name');
    expect(createdHomeless.body).toHaveProperty('age');
    expect(createdHomeless.body).toHaveProperty('institution');
    expect(createdHomeless.body).toHaveProperty('id');
    expect(createdHomeless.body).toHaveProperty('created_at');
    expect(createdHomeless.body).toHaveProperty('updated_at');
  });

  test('GET /homeless => Deve listar todos os homeless', async () => {
    const response = await request(app).get('/homeless');

    expect(response.status).toBe(200);
  });

  test('GET /homeless/:id => Deve buscar um homeless por seu id', async () => {
    const institutionLoginResponse = await request(app).post('/login').send(institutionLogin);
    const token = institutionLoginResponse.body.token;

    await request(app).post('/homeless/register').set('Authorization', `Bearer ${token}`).send(homelessData);

    const homeless = await request(app).get('/homeless');

    const response = await request(app).get(`/homeless/${homeless.body[0].id}`);
    expect(response.status).toBe(200);
  });

  test('PATCH /homeless/:id => Não deve atualizar um homeless sem autenticação', async () => {
    const homelessToBeUpdated = await request(app).get('/homeless');
    const response = await request(app).patch(`/homeless/${homelessToBeUpdated.body[0].id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('PATCH /homeless/:id => Deve atualizar um homeless', async () => {
    const newValues = {name: 'André Formiga', age: '28'};

    const institutionLoginResponse = await request(app).post('/login').send(institutionLogin);
    const token = `Bearer ${institutionLoginResponse.body.token}`;

    const homelessToBeUpdated = await request(app).get('/homeless');
    const homelessToBeUpdatedId = homelessToBeUpdated.body[0].id;

    const response = await request(app).patch(`/homeless/${homelessToBeUpdatedId}`).set('Authorization', token).send(newValues);

    expect(response.status).toBe(200)
  });

  test('DELETE /homeless/:id => Não deve deletar se nao estiver autenticado', async () => {
    const homelessToBeDeleted = await request(app).get('/homeless');
    const response = await request(app).delete(`/homeless/${homelessToBeDeleted.body[0].id}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message');
  });

  test('DELETE /homeless/:id => Deve ser capaz de deletar um homeless', async () => {
    const institutionLoginResponse = await request(app).post('/login').send(institutionLogin);
    const token = `Bearer ${institutionLoginResponse.body.token}`;

    const homelessToBeDeleted = await request(app).get('/homeless');
    const homelessToBeDeletedId = homelessToBeDeleted.body[0].id;

    const response = await request(app).delete(`/homeless/${homelessToBeDeletedId}`).set('Authorization', token);

    expect(response.status).toBe(204);
  });
});