const router = require('express').Router();
const { matchedData } = require('express-validator');
const ash = require('express-async-handler');
const {
  idParamValidator,
  bodyValidator,
  validate,
} = require('../../middlewares/emailValidator');
const { Email } = require('../../models/index');

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

    await Email.update(newEmail, { where: { id } });
    const email = await Email.findOne({ where: { id } });

    res.json({ message: 'Email atualizado com sucesso', email });
  })
);

module.exports = router;
