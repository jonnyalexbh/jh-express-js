const servicesUser = require('../services/user');

exports.signUp = (req, res, next) =>
  servicesUser
    .createUser(req.body)
    .then(result => res.status(201).send(result))
    .catch(next);

exports.signIn = (req, res, next) =>
  servicesUser
    .login(req.body)
    .then(token => {
      res.status(200).send({ token });
    })
    .catch(next);

exports.userList = (req, res, next) => {
  const { limit, offset } = req.query;
  servicesUser
    .users(limit, offset)
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};
