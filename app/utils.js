const jwt = require('jwt-simple'),
  config = require('../config/index'),
  { secret_key } = config.common.jwt;

exports.generateToken = user => {
  const tokenPayload = {
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email
  };
  return jwt.encode(tokenPayload, secret_key);
};
