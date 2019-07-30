const { healthCheck } = require('./controllers/healthCheck');
const { allAlbums, albumPhotos } = require('./controllers/albums');
const { storeUser } = require('./controllers/users');
const { signUpValidator } = require('./middlewares/validator');
exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/albums', allAlbums);
  app.get('/albums/:id/photos', albumPhotos);
  app.post('/users', signUpValidator, storeUser);
};
