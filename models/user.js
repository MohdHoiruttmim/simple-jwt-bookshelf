const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;

const connect = require('../config/config');

const User = connect.define('user', {
  fname:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  lname:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  date:{
    type: DataTypes.DATE,
    allowNull: false,
  }
  }, {
    timestamps: false,
    freezeTableName: true,
  });

module.exports = User;