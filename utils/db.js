const knexConfig = require('../db/knexfile');
const knex = require('knex')(knexConfig);

async function getRows(table, columns) {
  return knex(table)
    .select()
    .modify((dbQueryBuilder) => {
      if (columns) dbQueryBuilder.where(columns);
    })
    .then((resp) => resp)
    .catch((err) => err);
}

async function insertRow(table, row) {
  return knex(table)
    .insert(row)
    .then((id) => id)
    .catch((err) => next(err));
}

async function checkAnyRowExists(table, columns) {
  const rows = await getRows(table, columns);
  return Boolean(rows.length);
}

async function querySearchProducts(query) {
  return knex('products')
    .select()
    .modify((dbQueryBuilder) => {
      query.name && dbQueryBuilder.where('name', 'like', `%${query.name}%`);
      delete query.name;
      dbQueryBuilder.where(query);
    })
    .then((resp) => resp)
    .catch((err) => err);
}

async function querySearchEmails(query) {
  return knex('emails')
    .select()
    .modify((dbQueryBuilder) => {
      Object.entries(query).forEach((entry) => {
        const [key, value] = entry;
        dbQueryBuilder.where(key, 'like', `%${value}%`);
      });
    })
    .then((resp) => resp)
    .catch((err) => err);
}

module.exports = {
  knex,
  knexConfig,
  getRows,
  insertRow,
  checkAnyRowExists,
  querySearchProducts,
  querySearchEmails,
};
