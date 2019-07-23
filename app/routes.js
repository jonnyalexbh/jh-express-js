// const controller = require('./controllers/controller');
const { healthCheck } = require('./controllers/healthCheck');
const { allAlbums, albumPhotos } = require('./controllers/albums');
exports.init = app => {
  app.get('/health', healthCheck);
  // app.get('/endpoint/get/path', [], controller.methodGET);
  // app.put('/endpoint/put/path', [], controller.methodPUT);
  // app.post('/endpoint/post/path', [], controller.methodPOST);
  app.get('/albums', allAlbums);
  app.get('/albums/:id/photos', albumPhotos);
};
