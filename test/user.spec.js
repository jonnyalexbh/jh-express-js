const request = require('supertest'),
  app = require('../app'),
  { user } = require('./factories/user'),
  dictum = require('dictum.js');

describe('User Creation', () => {
  it('should create an user successfuly', () =>
    request(app)
      .post('/users')
      .send(user)
      .then(res => {
        expect(res.status).toEqual(201);
        expect(res.body.email).toEqual(user.email);
        dictum.chai(res, 'should create an user successfuly');
      }));

  it('should fail creation of user because for password requirements', () =>
    request(app)
      .post('/users')
      .send({ ...user, password: '123456' })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body.message[0].msg).toEqual('Password must be at least 8 characters in length.');
      }));

  it('should fail creation of user when the email exists in the database', () =>
    request(app)
      .post('/users')
      .send({ ...user, email: 'jonny@wolox.co' })
      .then(() => {
        request(app)
          .post('/users')
          .send({ ...user, email: 'jonny@wolox.co' })
          .then(res => {
            expect(res.status).toEqual(422);
            expect(res.body.message).toEqual('the email entered already exists!');
          });
      }));

  it('should fail when the last name is empty', () =>
    request(app)
      .post('/users')
      .send({ ...user, last_name: '' })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body.message[0].msg).toEqual('last_name is required.');
      }));
});
