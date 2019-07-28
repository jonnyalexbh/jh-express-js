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

exports.EMAIL_EXIST = 'email_exist';
exports.emailExist = message => internalError(message, exports.EMAIL_EXIST);

exports.VALIDATION_FAILED = 'validation_failed';
exports.validationFailed = message => internalError(message, exports.VALIDATION_FAILED);
