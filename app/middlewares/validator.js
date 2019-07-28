const { check, validationResult } = require('express-validator/check'),
  errors = require('../errors');

const validateErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationResult(req).isEmpty()) {
    throw errors.validationFailed(validationErrors.array());
  }
  next();
};

const fields = [
  check('first_name')
    .not()
    .isEmpty()
    .withMessage('name is required.'),
  check('last_name')
    .not()
    .isEmpty()
    .withMessage('last_name is required.'),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is missing.')
    .isEmail()
    .withMessage('Invalid email.')
    .matches(/^.+@wolox(\.com\.ar|\.co)$/i)
    .withMessage('The email does not belong to a Wolox domain.'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is missing.')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters in length.')
    .isAlphanumeric()
    .withMessage('Password must be alphanumeric')
];

exports.signUpValidator = [...fields, validateErrors];
