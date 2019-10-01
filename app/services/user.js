const { User } = require('../models'),
  error = require('../errors'),
  logger = require('../logger'),
  { checkPassword } = require('../helpers'),
  { generateToken } = require('../utils');

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

exports.login = user =>
  User.getOne(user.email).then(result => {
    logger.info(`trying to authenticate user ${user.email}`);
    if (result && checkPassword(user.password, result.password)) {
      return generateToken(result);
    }
    logger.error(`There is no user with that email: ${user.email}`);
    throw error.signInError('incorrect username or password');
  });
