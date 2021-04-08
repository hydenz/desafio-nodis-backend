module.exports = {
  development: {
    username: 'root',
    database: 'desafio-nodis',
    host: process.env.DB || '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    database: 'desafio-nodis-test',
    host: process.env.DB || '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
};
