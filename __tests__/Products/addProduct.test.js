const app = require('../../api');
const request = require('supertest');
const { knex } = require('../../utils/db');
const { genRandomProduct } = require('../utils/genRandomData');

beforeAll(async () => {
  await knex.raw('START TRANSACTION');
});

afterAll(async () => {
  await knex.raw('ROLLBACK');
  knex.destroy();
});

describe('Testar POST /products', () => {
  it('/products deve retornar status 200', async () => {
    const randomProduct = genRandomProduct();
    const resp = await request(app).post('/products').send(randomProduct);
    expect(resp.status).toBe(201);
  });
});
