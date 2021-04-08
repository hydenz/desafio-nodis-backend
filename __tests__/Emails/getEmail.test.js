const app = require('../../api');
const request = require('supertest');
const { sequelize } = require('../../models/index');

afterAll(async () => await sequelize.close());

describe('Testar GET /emails', () => {
  it('/emails deve retornar status 200', async () => {
    const resp = await request(app).get('/emails');
    expect(resp.status).toBe(200);
  });

  it('/emails/1 deve retornar status 200', async () => {
    const resp = await request(app).get('/emails/1');
    expect(resp.status).toBe(200);
  });

  it('/emails?from=@ deve retornar status 200', async () => {
    const resp = await request(app).get('/emails?from=@');
    expect(resp.status).toBe(200);
  });

  it('/emails/10000 deve retornar status 404', async () => {
    const resp = await request(app).get('/emails/10000');
    expect(resp.status).toBe(404);
  });

  it('/emails/test deve retornar status 400', async () => {
    const resp = await request(app).get('/emails/test');
    expect(resp.status).toBe(400);
  });
});
