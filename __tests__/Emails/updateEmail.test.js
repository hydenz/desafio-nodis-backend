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

describe('Testar PATCH /emails', () => {
  it('/emails/1 deve retornar status 200', async () => {
    const randomEmail = genRandomEmail();
    const resp = await request(app).patch('/emails/1').send(randomEmail);
    expect(resp.status).toBe(200);
  });
});
