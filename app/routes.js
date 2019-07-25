const { healthCheck } = require('./controllers/healthCheck');
const { allAlbums, albumPhotos } = require('./controllers/albums');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', allAlbums);
  app.get('/albums/:id/photos', albumPhotos);
};
