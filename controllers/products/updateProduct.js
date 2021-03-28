const router = require('express').Router();
const {
  idParamValidator,
  bodyValidator,
  validate,
} = require('../../middlewares/productsValidator');
const { matchedData, body } = require('express-validator');
const { knex, getRows } = require('../../utils/db');
const ash = require('express-async-handler');

router.patch(
  '/products/:id',
  idParamValidator('PATCH'),
  validate,
  bodyValidator('PATCH'),
  validate,
  body('images').customSanitizer((value) => JSON.stringify(value)),
  ash(async (req, res) => {
    const { id } = req.params;
    const newProduct = matchedData(req, {
      includeOptionals: true,
      locations: ['body'],
    });

    newProduct.updatedAt = knex.fn.now();
    await knex('products').update(newProduct).where({ id });
    const rows = await getRows('products', { id });
    res.json({
      message: 'Produto atualizado com sucesso',
      product: rows[0],
    });
  })
);

module.exports = router;
