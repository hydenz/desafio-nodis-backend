const router = require('express').Router();
const {
  idParamValidator,
  queryValidator,
  validate,
} = require('../../middlewares/productsValidator');
const { matchedData } = require('express-validator');
const ash = require('express-async-handler');
const { getRows, querySearchProducts } = require('../../utils/db');

router.get(
  '/products/:id?',
  idParamValidator('GET'),
  queryValidator(),
  validate,
  ash(async (req, res) => {
    const query = matchedData(req, {
      locations: ['query'],
    });
    const { id } = req.params;
    let rows;
    if (id) {
      res.json(req.product);
    }
    // Se houver alguma query
    else if (Object.keys(query).length) {
      rows = await querySearchProducts(query);
    } else {
      rows = await getRows('products');
    }
    res.json(rows);
  })
);

module.exports = router;
