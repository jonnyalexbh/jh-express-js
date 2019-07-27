const servicesUser = require('../services/user'),
  helpers = require('../helpers');

exports.storeUser = (req, res, next) => {
  const user = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: helpers.encryptPassword(req.body.password)
  };
  return servicesUser
    .createUser(user)
    .then(result => res.send(result))
    .catch(next);
};
