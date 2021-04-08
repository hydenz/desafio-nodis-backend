const router = require('express').Router();
const {
  idParamValidator,
  bodyValidator,
  validate,
} = require('../../middlewares/productsValidator');
const { matchedData, body } = require('express-validator');
const Sequelize = require('sequelize');
const { Product } = require('../../models/index');
const ash = require('express-async-handler');

router.patch(
  '/products/:id',
  idParamValidator('PATCH'),
  validate,
  bodyValidator('PATCH'),
  validate,
  // body('images').customSanitizer((value) => JSON.stringify(value)),
  ash(async (req, res) => {
    const { id } = req.params;
    let newProduct = matchedData(req, {
      includeOptionals: true,
      locations: ['body'],
    });
    newProduct.updatedAt = Sequelize.fn('now');
    await Product.update(newProduct, { where: { id } });
    newProduct = await Product.findOne({ where: { id } });
    res.json({
      message: 'Produto atualizado com sucesso',
      product: newProduct,
    });
  })
);

module.exports = router;
