const bcrypt = require('bcryptjs'),
  config = require('../config/index'),
  { salt_sync } = config.common.encryption;

const salt = bcrypt.genSaltSync(parseInt(salt_sync));

exports.encryptPassword = password => bcrypt.hashSync(password, salt);

exports.checkPassword = (password, hashed) => bcrypt.compareSync(password, hashed);
