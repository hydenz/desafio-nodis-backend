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

describe('Testar PATCH /products', () => {
  it('/products/1 deve retornar status 200', async () => {
    const randomProduct = genRandomProduct();
    randomProduct.price = await request(app)
      .get('/products/1')
      .then((resp) => resp.body.price);
    const resp = await request(app).patch('/products/1').send(randomProduct);
    expect(resp.status).toBe(200);
  });
});
