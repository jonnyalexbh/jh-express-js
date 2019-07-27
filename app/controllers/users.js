const servicesUser = require('../services/user');

exports.storeUser = (req, res, next) =>
  servicesUser
    .createUser(req.body)
    .then(result => res.send(result))
    .catch(next);
