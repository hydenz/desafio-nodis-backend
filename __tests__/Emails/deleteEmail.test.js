const app = require('../../api');
const request = require('supertest');
const { knex } = require('../../utils/db');

beforeAll(async () => {
  await knex.raw('START TRANSACTION');
});

afterAll(async () => {
  await knex.raw('ROLLBACK');
  knex.destroy();
});

describe('Testar DELETE /emails', () => {
  it('/emails/1 deve retornar status 200', async () => {
    const resp = await request(app).delete('/emails/1');
    expect(resp.status).toBe(200);
  });
});
