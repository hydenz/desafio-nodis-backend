const router = require('express').Router();
const {
  idParamValidator,
  queryValidator,
  validate,
} = require('../../middlewares/productsValidator');
const { matchedData } = require('express-validator');
const ash = require('express-async-handler');
const { Product } = require('../../models/index');
const { Op } = require('sequelize');

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
      rows = req.product;
    }
    // Se houver alguma query
    else if (Object.keys(query).length) {
      // O nome será filtrado pelo operador SQL like %name%
      // As outras queries serão filtradas pelo valor exato
      rows = await Product.findAll({
        where: {
          ...query,
          ...(query.name && { name: { [Op.substring]: query.name } }),
        },
      });
    } else {
      rows = await Product.findAll();
    }
    res.json(rows);
  })
);

module.exports = router;
