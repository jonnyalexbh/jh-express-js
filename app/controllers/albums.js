const { getAlbums, getAlbumPhotos } = require('../services/album');

exports.allAlbums = async (req, res, next) => {
  try {
    const albums = await getAlbums('/albums');
    res.status(200).send(albums);
  } catch (err) {
    next(err);
  }
};

exports.albumPhotos = async (req, res, next) => {
  try {
    const albumphotos = await getAlbumPhotos(`/photos?albumId=${req.params.id}`);
    res.status(200).send(albumphotos);
  } catch (err) {
    next(err);
  }
};
