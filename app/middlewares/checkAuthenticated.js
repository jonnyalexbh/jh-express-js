const errors = require('../errors'),
  { checkToken } = require('../utils');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw errors.validationError('The authorization token is required');
  }

  const token = req.headers.authorization.split(' ')[1];
  const payload = checkToken(token);
  req.user = payload.sub;

  next();
};
