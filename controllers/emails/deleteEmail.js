const router = require('express').Router();
const ash = require('express-async-handler');
const {
  idParamValidator,
  validate,
} = require('../../middlewares/emailValidator');
const { Email } = require('../../models/index');

router.delete(
  '/emails/:id',
  idParamValidator('DELETE'),
  validate,
  ash(async (req, res) => {
    const { id } = req.params;
    await Email.destroy({ where: { id } });
    res.status(200).json({ message: 'Email deletado com sucesso' });
  })
);

module.exports = router;
