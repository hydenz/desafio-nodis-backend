const router = require('express').Router();
const { matchedData } = require('express-validator');
const ash = require('express-async-handler');
const {
  idParamValidator,
  validate,
} = require('../../middlewares/emailValidator');
const { knex } = require('../../utils/db');

router.delete(
  '/emails/:id',
  idParamValidator('DELETE'),
  validate,
  ash(async (req, res) => {
    const { id } = req.params;
    await knex('emails').delete().where({ id });
    res.status(204).json({ message: 'Email deletado com sucesso' });
  })
);

module.exports = router;
