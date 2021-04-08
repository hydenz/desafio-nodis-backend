const router = require('express').Router();
const { matchedData } = require('express-validator');
const ash = require('express-async-handler');
const { bodyValidator, validate } = require('../../middlewares/emailValidator');
const { Email } = require('../../models/index');

router.post(
  '/emails',
  bodyValidator('POST'),
  validate,
  ash(async (req, res) => {
    const newEmail = matchedData(req, {
      locations: ['body'],
    });

    const email = await Email.create(newEmail);
    res.status(201).json({
      message: 'Email adicionado com sucesso',
      email,
    });
  })
);

module.exports = router;
