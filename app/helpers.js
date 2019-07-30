const bcrypt = require('bcryptjs'),
  salt_sync = require('../config').encryption;

const salt = bcrypt.genSaltSync(parseInt(salt_sync));

exports.encryptPassword = password => bcrypt.hashSync(password, salt());
