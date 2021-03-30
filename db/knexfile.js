const moment = require('moment');
const path = require('path');

module.exports = {
  client: 'mysql',
  connection: {
    host: 'db',
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
  migrations: { directory: path.join(__dirname, 'migrations') },
  seeds: { directory: path.join(__dirname, 'seeds') },
};
