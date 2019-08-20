const request = require('supertest'),
  app = require('../app'),
  { user } = require('./factories/user'),
  dictum = require('dictum.js');

describe('User Creation', () => {
  it('should create an user successfuly', done =>
    request(app)
      .post('/users')
      .send(user)
      .then(res => {
        expect(res.status).toEqual(201);
        expect(res.body.email).toEqual(user.email);
        dictum.chai(res, 'should create an user successfuly');
        done();
      }));

  it('should fail creation of user because for password requirements', done =>
    request(app)
      .post('/users')
      .send({ ...user, password: '123456' })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body.message[0].msg).toEqual('Password must be at least 8 characters in length.');
        done();
      }));

  it('should fail creation of user when the email exists in the database', done =>
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
            done();
          });
      }));

  it('should fail when the last name is empty', done =>
    request(app)
      .post('/users')
      .send({ ...user, last_name: '' })
      .then(res => {
        expect(res.status).toEqual(400);
        expect(res.body.message[0].msg).toEqual('last_name is required.');
        done();
      }));
});

describe('User Sign-In', () => {
  it('should authenticate correctly', done =>
    request(app)
      .post('/users')
      .send({ ...user, email: 'jonny@wolox.co' })
      .then(response => {
        request(app)
          .post('/users/sessions')
          .send({ email: response.body.email, password: user.password })
          .then(res => {
            expect(res.status).toEqual(200);
            expect(res.body).toHaveProperty('token');
            done();
          });
      }));

  it('should fail because the data does not exist', done =>
    request(app)
      .post('/users/sessions')
      .send({ email: user.email, password: user.password })
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('incorrect username or password');
        done();
      }));
});
