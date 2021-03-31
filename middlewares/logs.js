const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const logStream = fs.createWriteStream(
  path.join(__dirname, '../logs', 'logs.log'),
  { flags: 'a' }
);

const logs = morgan('common', { stream: logStream });

module.exports = logs;
