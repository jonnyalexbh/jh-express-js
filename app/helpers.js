const bcrypt = require('bcryptjs'),
  jwt = require('jwt-simple'),
  config = require('../config/index'),
  { secret_key } = config.common.jwt,
  { salt_sync } = config.common.encryption;

const salt = bcrypt.genSaltSync(parseInt(salt_sync));

exports.encryptPassword = password => bcrypt.hashSync(password, salt);

exports.checkPassword = (password, hashed) => bcrypt.compareSync(password, hashed);

exports.generateToken = user => {
  const tokenPayload = {
    lastName: user.lastName,
    firstName: user.firstName,
    email: user.email
  };
  return jwt.encode(tokenPayload, secret_key);
};
