'use strict';

const logger = require('../logger');
const errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
        allowNull: false
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'users'
    }
  );

  User.getOne = email =>
    User.findOne({ where: { email } }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  User.getAll = (limit = 10, offset = 0) =>
    User.findAll({ offset, limit }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  return User;
};
