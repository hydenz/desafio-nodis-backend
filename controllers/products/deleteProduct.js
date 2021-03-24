const router = require('express').Router();
const {
  idParamValidator,
  validate,
} = require('../../middlewares/productsValidator');
const ash = require('express-async-handler');
const { knex, getRows } = require('../../utils/db');

router.delete(
  '/products/:id',
  idParamValidator('DELETE'),
  validate,
  ash(async (req, res) => {
    const { id } = req.params;

    await knex('products').update({ deletedAt: knex.fn.now() }).where({ id });
    const rows = await getRows('products', { id });
    res.json({ message: 'Produto deletado com sucesso', product: rows[0] });
  })
);
module.exports = router;
