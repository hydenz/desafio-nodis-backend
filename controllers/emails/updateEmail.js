const router = require('express').Router();
const { matchedData } = require('express-validator');
const ash = require('express-async-handler');
const {
  idParamValidator,
  bodyValidator,
  validate,
} = require('../../middlewares/emailValidator');
const { knex, getRows } = require('../../utils/db');

router.patch(
  '/emails/:id',
  idParamValidator('PATCH'),
  validate,
  bodyValidator('PATCH'),
  validate,
  ash(async (req, res) => {
    const { id } = req.params;
    const newEmail = matchedData(req, {
      includeOptionals: true,
      locations: ['body'],
    });

    await knex('emails').update(newEmail).where({ id });
    const rows = await getRows('emails', { id });
    res.json({ message: 'Email atualizado com sucesso', email: rows[0] });
  })
);

module.exports = router;
