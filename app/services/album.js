const axios = require('axios'),
  config = require('../../config'),
  base_uri = config.common.albumsApi.url,
  errors = require('../errors'),
  logger = require('../logger');

exports.getAlbums = source =>
  axios
    .get(`${base_uri}${source}`)
    .then(response => response.data)
    .catch(error => {
      logger.error(error);
      throw errors.albumsApiError(error.message);
    });

exports.getAlbumPhotos = source =>
  axios
    .get(`${base_uri}${source}`)
    .then(response => response.data)
    .catch(error => {
      logger.error(error);
      throw errors.albumsApiError(error.message);
    });
