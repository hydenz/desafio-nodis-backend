const app = require('../../api');
const request = require('supertest');
const { genRandomEmail } = require('../utils/genRandomData');
const { sequelize } = require('../../models/index');

afterAll(async () => await sequelize.close());

describe('Testar PATCH /emails', () => {
  it('/emails/1 deve retornar status 200', async () => {
    const randomEmail = genRandomEmail();
    const resp = await request(app).patch('/emails/1').send(randomEmail);
    expect(resp.status).toBe(200);
  });
});
