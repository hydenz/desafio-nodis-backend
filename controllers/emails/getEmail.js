const router = require('express').Router();
const { matchedData } = require('express-validator');
const ash = require('express-async-handler');
const {
  idParamValidator,
  queryValidator,
  validate,
} = require('../../middlewares/emailValidator');
const { Email } = require('../../models/index');
const { Op } = require('sequelize');

router.get(
  '/emails/:id?',
  idParamValidator('GET'),
  queryValidator(),
  validate,
  ash(async (req, res) => {
    const query = matchedData(req, {
      locations: ['query'],
      onlyValidData: true,
    });
    const { id } = req.params;
    let rows;
    if (id) {
      rows = req.email;
    }
    // Se houver alguma query
    else if (Object.keys(query).length) {
      const whereObj = {};
      // Criando todas as queries como substring
      Object.entries(query).forEach(([k, v]) => {
        whereObj[k] = { [Op.substring]: v };
      });
      rows = await Email.findAll({ where: whereObj });
    } else {
      rows = await Email.findAll();
    }
    res.json(rows);
  })
);

module.exports = router;
