const { Sequelize } = require('sequelize');

const connect = new Sequelize('bookself', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = connect;