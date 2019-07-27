const { User } = require('../models'),
  error = require('../errors'),
  logger = require('../logger'),
  bcrypt = require('bcryptjs'),
  salt_sync = require('../../config').encryption;

const salt = () => bcrypt.genSaltSync(parseInt(salt_sync));

exports.createUser = user =>
  User.create(user)
    .then(result => {
      logger.info(`user with name ${user.first_name} created!`);
      return result;
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        logger.error('The email entered already exists');
        throw error.emailExist('the email entered already exists!');
      }
      logger.error(`Could not create user: ${user.first_name}`);
      throw error.databaseError(err.message);
    });

exports.encryptPassword = password => bcrypt.hashSync(password, salt());
