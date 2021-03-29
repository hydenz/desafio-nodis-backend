const errorHandler = require('../middlewares/errorHandler');

describe('Testar errorHandler', () => {
  it('Deve lidar com um erro', async () => {
    let req, next;
    let res = {
      data: null,
      code: null,
      status(status) {
        this.code = status;
        return this;
      },
      json(payload) {
        this.data = payload;
      },
    };

    errorHandler(new Error(), req, res, next);
    expect(res.code).toBe(500);
  });
});
