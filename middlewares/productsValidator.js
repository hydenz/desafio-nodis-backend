const { body, param, query, validationResult } = require('express-validator');
const { getRows, checkAnyRowExists } = require('../utils/db');

const dbParams = {
  NAME_MAX_LENGTH: 128,
  GTIN13_LENGTH: 13,
  DESCRIPTION_MAX_LENGTH: 1024,
  IMAGES_MAX_LENGTH: 1024,
  PRICE_MAX_INTEGER: 2147483647,
  QUANTITY_MAX_INTEGER: 2147483647,
  STATUS_REGEXP: /^(AVAILABLE|UNAVAILABLE)$/,
};

const queryValidator = () => [
  query('name', 'Deve ser não vazio (case insensitive)').optional().notEmpty(),
  query('gtin13', 'Deve ser numérico e de comprimento 13')
    .optional()
    .isNumeric()
    .bail()
    .isLength({ min: dbParams.GTIN13_LENGTH, max: dbParams.GTIN13_LENGTH })
    .bail(),
  query('price', 'Deve ser numérico').optional().isNumeric(),
  query('quantity', 'Deve ser numérico').optional().isNumeric(),
  query('status', 'Deve ser AVAILABLE ou UNAVAILABLE')
    .optional()
    .custom((status) => dbParams.STATUS_REGEXP.test(status)),
];

const idParamValidator = (method) => {
  const validator = param(
    'id',
    'O parâmetro ID precisa ser um inteiro maior ou igual a 1'
  )
    [`${method === 'GET' ? 'optional' : 'exists'}`]()
    .bail()
    .isInt({ min: 1 })
    .bail()
    .custom(async (id, { req }) => {
      const rows = await getRows('products', { id });
      if (!rows.length) {
        req.status = 404;
        return Promise.reject(`Produto de ID ${id} não encontrado`);
      }
      const product = rows[0];
      req.product = product;
    })
    .bail()
    .if(() => method === 'PATCH' || method === 'DELETE')
    .custom(
      async (id, { req }) =>
        req.product.deletedAt &&
        Promise.reject(`O produto de ID ${req.product.id} já foi deletado`)
    );

  return [validator];
};

const bodyValidator = (method) => {
  const conditions = { POST: 'exists', PATCH: 'optional' };

  const validations = [
    body(
      'name',
      `Deve ser do tipo String de comprimento mínimo 1 e máximo ${dbParams.NAME_MAX_LENGTH}`
    )
      [conditions[method]]()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 1, max: dbParams.NAME_MAX_LENGTH })
      .bail()
      .custom(
        async (name) =>
          (await checkAnyRowExists('products', { name })) &&
          Promise.reject('Este nome de produto já está sendo usado')
      ),
    body(
      'gtin13',
      `Deve ser do tipo String de comprimento ${dbParams.GTIN13_LENGTH}`
    )
      [conditions[method]]()
      .bail()
      .isString()
      .bail()
      .isLength({ min: dbParams.GTIN13_LENGTH, max: dbParams.GTIN13_LENGTH })
      .bail()
      .custom(
        async (gtin13) =>
          (await checkAnyRowExists('products', { gtin13 })) &&
          Promise.reject('Este gtin13 já está sendo usado')
      ),
    body(
      'description',
      `Deve ser do tipo String de comprimento mínimo 1 e máximo ${dbParams.DESCRIPTION_MAX_LENGTH}`
    )
      [conditions[method]]()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 1, max: dbParams.DESCRIPTION_MAX_LENGTH }),
    body(
      'images',
      `Deve ser do tipo Array de Strings que, quando transformado em JSON String, ter comprimento máximo ${dbParams.IMAGES_MAX_LENGTH}`
    )
      [conditions[method]]()
      .bail()
      .isArray({ min: 1 })
      .bail()
      .custom((value) => value.filter((v) => typeof v === 'string').length)
      .bail()
      .custom(
        (value) => JSON.stringify(value).length <= dbParams.IMAGES_MAX_LENGTH
      ),
    body(
      'price',
      `Deve ser do tipo Number inteiro em centavos com valor mínimo 1 e máximo ${dbParams.PRICE_MAX_INTEGER}`
    )
      [conditions[method]]()
      .bail()
      .custom((price) => typeof price === 'number')
      .bail()
      .isInt({ min: 1, max: dbParams.PRICE_MAX_INTEGER })
      .bail()
      .if(async (price, { req }) => {
        return req.method !== 'PATCH' && Promise.reject();
      })
      .custom(async (price, { req }) => {
        const products = await getRows('products', { id: req.params.id });
        return (
          price <= products[0].price * 0.5 &&
          Promise.reject(
            'Não é permitido uma redução de 50% ou mais no preço de um produto'
          )
        );
      }),
    body(
      'quantity',
      `Deve ser do tipo Number inteiro com valor mínimo 1 e máximo ${dbParams.PRICE_MAX_INTEGER}`
    )
      [conditions[method]]()
      .bail()
      .custom((quantity) => typeof quantity === 'number')
      .bail()
      .isInt({ min: 1, max: dbParams.QUANTITY_MAX_INTEGER }),
    body(
      'status',
      "Deve ser do tipo String no formato 'AVAILABLE' ou 'UNAVAILABLE'"
    )
      .optional()
      .custom((status) => dbParams.STATUS_REGEXP.test(status)),
  ];
  return validations;
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => {
    extractedErrors.push({
      [err.param]: err.msg,
    });
  });

  const httpCode = req.status || 400;
  return res.status(httpCode).json({
    errors: extractedErrors,
  });
};

module.exports = {
  queryValidator,
  idParamValidator,
  bodyValidator,
  validate,
};
