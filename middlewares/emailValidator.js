const { body, param, query, validationResult } = require('express-validator');
const { getRows } = require('../utils/db');

const dbParams = {
  FROM_MAX_LENGTH: 64,
  TO_MAX_LENGTH: 64,
  BODY_MAX_LENGTH: 65535,
};

const queryValidator = () => [
  query('from', 'Deve ser não vazio (case insensitive)').optional().notEmpty(),
  query('to', 'Deve ser não vazio (case insensitive)').optional().notEmpty(),
  query('body', 'Deve ser não vazio').optional().notEmpty(),
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
      const rows = await getRows('emails', { id });
      if (!rows.length) {
        req.status = 404;
        return Promise.reject(`Email de ID ${id} não encontrado`);
      }
      req.email = rows[0];
    });

  return [validator];
};

const bodyValidator = (method) => {
  const conditions = { POST: 'exists', PATCH: 'optional' };

  const validations = [
    body(
      'from',
      `Deve ser do tipo String que contenha um email de comprimento mínimo 1 e máximo ${dbParams.FROM_MAX_LENGTH}`
    )
      [conditions[method]]()
      .bail()
      .isEmail(),

    body(
      'to',
      `Deve ser do tipo String que contenha um email de comprimento mínimo 1 e máximo ${dbParams.TO_MAX_LENGTH}`
    )
      [conditions[method]]()
      .bail()
      .isEmail(),

    body(
      'body',
      `Deve ser do tipo String de comprimento mínimo 1 e máximo ${dbParams.BODY_MAX_LENGTH}`
    )
      [conditions[method]]()
      .bail()
      .isString()
      .bail()
      .isLength({ min: 1, max: dbParams.DESCRIPTION_MAX_LENGTH }),
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
