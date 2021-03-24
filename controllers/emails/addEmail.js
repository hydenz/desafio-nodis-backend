const router = require('express').Router();
const { matchedData } = require('express-validator');
const ash = require('express-async-handler');
const { bodyValidator, validate } = require('../../middlewares/emailValidator');
const { insertRow, getRows } = require('../../utils/db');

router.post(
  '/emails',
  bodyValidator('POST'),
  validate,
  ash(async (req, res) => {
    const newEmail = matchedData(req, {
      locations: ['body'],
    });
    const id = await insertRow('emails', newEmail);
    const rows = await getRows('emails', { id });
    res.status(201).json({
      message: 'Email adicionado com sucesso',
      email: rows[0],
    });
  })
);

module.exports = router;
