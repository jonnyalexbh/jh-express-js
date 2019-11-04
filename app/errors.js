const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.ALBUMS_API_ERROR = 'albums_api_error';
exports.albumsApiError = message => internalError(message, exports.ALBUMS_API_ERROR);

exports.EMAIL_EXIST_ERROR = 'email_exist_error';
exports.emailExistError = message => internalError(message, exports.EMAIL_EXIST_ERROR);

exports.VALIDATION_ERROR = 'validation_error';
exports.validationError = message => internalError(message, exports.VALIDATION_ERROR);

exports.TOKEN_ERROR = 'token_error';
exports.tokenError = message => internalError(message, exports.TOKEN_ERROR);

exports.SIGN_IN_ERROR = 'sign_in_error';
exports.signInError = message => internalError(message, exports.SIGN_IN_ERROR);
