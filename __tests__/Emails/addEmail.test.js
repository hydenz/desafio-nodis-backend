const app = require('../../api');
const request = require('supertest');
const { genRandomEmail } = require('../utils/genRandomData');
const { sequelize } = require('../../models/index');

afterAll(async () => await sequelize.close());

describe('Testar POST /emails', () => {
  it('/emails deve retornar status 200', async () => {
    const randomEmail = genRandomEmail();
    const resp = await request(app).post('/emails').send(randomEmail);
    expect(resp.status).toBe(201);
  });
});
