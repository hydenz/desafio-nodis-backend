const moment = require('moment');

module.exports = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    database: 'desafio-nodis',
    timezone: 'UTC',
    typeCast: function (field, next) {
      if (field.type == 'DATETIME') {
        const fieldValue = field.string();
        const isValidDate = moment(fieldValue).isValid();
        return isValidDate
          ? moment(fieldValue).format('YYYY-MM-DD HH:mm:ss')
          : null;
      } else if (field.name === 'images') {
        const fieldValue = field.string();
        return JSON.parse(fieldValue);
      }
      return next();
    },
  },
  migrations: { directory: './migrations' },
  seeds: { directory: './seeds' },
};
