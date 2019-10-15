const { check, validationResult } = require('express-validator/check'),
  helpers = require('../helpers'),
  errors = require('../errors');

const validateErrors = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (!validationResult(req).isEmpty()) {
    throw errors.validationError(validationErrors.array());
  }
  next();
};

const fieldsSignUp = [
  check('firstName')
    .not()
    .isEmpty()
    .withMessage('firstName is required.'),
  check('lastName')
    .not()
    .isEmpty()
    .withMessage('lastName is required.'),
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
    .customSanitizer(password => helpers.encryptPassword(password))
];

const fieldsSingIn = [
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is missing.')
    .isEmail()
    .withMessage('Invalid email.')
    .matches(/^.+@wolox(\.com\.ar|\.co)$/i)
    .withMessage('The email does not belong to a Wolox domain.')
];

exports.signUpValidator = [...fieldsSignUp, validateErrors];
exports.signInValidator = [...fieldsSingIn, validateErrors];
