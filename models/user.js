const { Sequelize } = require('sequelize');
const { DataTypes } = Sequelize;

const connect = require('../database/config');

const User = connect.define('users', {
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
  refresh_token:{
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