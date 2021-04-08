const app = require('../../api');
const request = require('supertest');
const { sequelize } = require('../../models/index');

afterAll(async () => await sequelize.close());

describe('Testar DELETE /products', () => {
  it('/products/2 deve retornar status 200', async () => {
    const resp = await request(app).delete('/products/2');
    expect(resp.status).toBe(200);
  });
});
