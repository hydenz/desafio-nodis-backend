const router = require('express').Router();
const {
  bodyValidator,
  validate,
} = require('../../middlewares/productsValidator');
const { matchedData } = require('express-validator');
const ash = require('express-async-handler');
const { Product } = require('../../models/index');

router.post(
  '/products',
  bodyValidator('POST'),
  validate,
  // body('images').customSanitizer((value) => JSON.stringify(value)),
  ash(async (req, res) => {
    let newProduct = matchedData(req, {
      includeOptionals: true,
      locations: ['body'],
    });
    newProduct = await Product.create(newProduct);
    await newProduct.reload();
    res.status(201).json({
      message: 'Produto adicionado com sucesso',
      product: newProduct,
    });
  })
);

module.exports = router;
