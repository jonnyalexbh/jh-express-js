const { getInfoAlbums } = require('../services/album');

exports.allAlbums = (_, res, next) =>
  getInfoAlbums('/albums')
    .then(albums => {
      res.status(200).send(albums);
    })
    .catch(next);

exports.albumPhotos = (req, res, next) =>
  getInfoAlbums(`/photos?albumId=${req.params.id}`)
    .then(albums => {
      res.status(200).send(albums);
    })
    .catch(next);
