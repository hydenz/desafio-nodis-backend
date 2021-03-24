const router = require('express').Router();
const {
  bodyValidator,
  validate,
} = require('../../middlewares/productsValidator');
const { matchedData, body } = require('express-validator');
const ash = require('express-async-handler');
const { insertRow, getRows } = require('../../utils/db');

router.post(
  '/products',
  bodyValidator('POST'),
  validate,
  body('images').customSanitizer((value) => JSON.stringify(value)),
  ash(async (req, res) => {
    const newProduct = matchedData(req, {
      includeOptionals: true,
      locations: ['body'],
    });

    const id = await insertRow('products', newProduct);
    const rows = await getRows('products', { id });
    res.status(201).json({
      message: 'Produto adicionado com sucesso',
      product: rows[0],
    });
  })
);

module.exports = router;
