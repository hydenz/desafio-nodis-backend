const app = require('../../api');
const request = require('supertest');
const { genRandomProduct } = require('../utils/genRandomData');
const { sequelize } = require('../../models/index');

afterAll(async () => await sequelize.close());

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
