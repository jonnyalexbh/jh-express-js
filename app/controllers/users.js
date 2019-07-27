const servicesUser = require('../services/user');

exports.storeUser = (req, res, next) => {
  const user = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: servicesUser.encryptPassword(req.body.password)
  };
  return servicesUser
    .createUser(user)
    .then(result => res.send(result))
    .catch(next);
};
