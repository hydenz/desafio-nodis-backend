const app = require('../../api');
const request = require('supertest');
const { knex } = require('../../utils/db');
const { genRandomEmail } = require('../utils/genRandomData');

beforeAll(async () => {
  await knex.raw('START TRANSACTION');
});

afterAll(async () => {
  await knex.raw('ROLLBACK');
  knex.destroy();
});

describe('Testar POST /emails', () => {
  it('/emails deve retornar status 200', async () => {
    const randomEmail = genRandomEmail();
    const resp = await request(app).post('/emails').send(randomEmail);
    expect(resp.status).toBe(201);
  });
});
