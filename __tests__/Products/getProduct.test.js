const app = require('../../api');
const request = require('supertest');
const { sequelize } = require('../../models/index');

afterAll(async () => await sequelize.close());

describe('Testar GET /products', () => {
  it('/products deve retornar status 200', async () => {
    const resp = await request(app).get('/products');
    expect(resp.status).toBe(200);
  });

  it('/products/1 deve retornar status 200', async () => {
    const resp = await request(app).get('/products/1');
    expect(resp.status).toBe(200);
  });

  it('/products?name=test&status=AVAILABLE deve retornar status 200', async () => {
    const resp = await request(app).get('/products?name=test&status=AVAILABLE');
    expect(resp.status).toBe(200);
  });

  it('/products/10000 deve retornar status 404', async () => {
    const resp = await request(app).get('/products/10000');
    expect(resp.status).toBe(404);
  });

  it('/products/test deve retornar status 400', async () => {
    const resp = await request(app).get('/products/test');
    expect(resp.status).toBe(400);
  });
});
