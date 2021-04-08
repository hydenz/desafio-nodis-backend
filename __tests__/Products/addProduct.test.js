const app = require('../../api');
const request = require('supertest');
const { genRandomProduct } = require('../utils/genRandomData');
const { sequelize } = require('../../models/index');

afterAll(async () => await sequelize.close());

describe('Testar POST /products', () => {
  it('/products deve retornar status 201', async () => {
    const randomProduct = genRandomProduct();
    const resp = await request(app).post('/products').send(randomProduct);
    expect(resp.status).toBe(201);
  });
});
