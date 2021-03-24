const router = require('express').Router();
const { matchedData } = require('express-validator');
const ash = require('express-async-handler');
const {
  idParamValidator,
  queryValidator,
  validate,
} = require('../../middlewares/emailValidator');
const { querySearchEmails, getRows } = require('../../utils/db');

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
      res.json(req.email);
    }
    // Se houver alguma query
    else if (Object.keys(query).length) {
      rows = await querySearchEmails(query);
    } else {
      rows = await getRows('emails');
    }
    res.json(rows);
  })
);

module.exports = router;
