const { User } = require('../models'),
  error = require('../errors'),
  logger = require('../logger');

exports.createUser = user =>
  User.create(user)
    .then(result => {
      logger.info(`user with name ${user.first_name} created!`);
      return result;
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        logger.error('The email entered already exists');
        throw error.emailExistError('the email entered already exists!');
      }
      logger.error(`Could not create user: ${user.first_name}`);
      throw error.databaseError(err.message);
    });
