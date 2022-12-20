const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;

const connect = require('../config/config');

const Book = connect.define('testbooks', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isComplete: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
  },
}, {
  timestamps: false,
  freezeTableName: true,
  // Other model options go here
});

module.exports = Book;
// `sequelize.define` also returns the model
// console.log(Book === sequelize.models.Book); // true