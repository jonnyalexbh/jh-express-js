const servicesUser = require('../services/user'),
  helpers = require('../helpers');

exports.signUp = (req, res, next) => {
  const user = {
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: helpers.encryptPassword(req.body.password)
  };
  return servicesUser
    .createUser(user)
    .then(result => res.status(201).send(result))
    .catch(next);
};

exports.signIn = (req, res, next) =>
  servicesUser
    .login(req.body)
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(next);
