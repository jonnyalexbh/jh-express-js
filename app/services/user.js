const { User } = require('../models');

exports.createUser = user =>
  User.create({
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    password: user.password
  })
    .then(result => result)
    .catch(err => err);
