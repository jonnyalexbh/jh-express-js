const jwt = require('jwt-simple'),
  config = require('../config/index'),
  errors = require('./errors'),
  logger = require('./logger'),
  { secret_key } = config.common.jwt;

exports.generateToken = user => {
  const tokenPayload = {
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email
  };
  return jwt.encode(tokenPayload, secret_key);
};

exports.checkToken = token => {
  try {
    return jwt.decode(token, secret_key);
  } catch (error) {
    logger.error(error);
    throw errors.tokenError('incorrect token');
  }
};
