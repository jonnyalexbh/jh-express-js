'use strict';
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
  return User;
};
