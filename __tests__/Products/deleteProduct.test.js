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

describe('Testar DELETE /products', () => {
  it('/products/1 deve retornar status 200', async () => {
    const resp = await request(app).delete('/products/1');
    expect(resp.status).toBe(200);
  });
});
