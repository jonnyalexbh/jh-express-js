const request = require('supertest'),
  app = require('../app'),
  userFactory = require('./factories/userFactory'),
  helpers = require('../app/helpers'),
  dictum = require('dictum.js');

describe('User Creation', () => {
  it('should create an user successfuly', async () => {
    const user = await userFactory.attributes();
    const res = await request(app)
      .post('/users')
      .send(user);
    expect(res.status).toEqual(201);
    expect(res.body.email).toEqual(user.email);
    dictum.chai(res, 'should create an user successfuly');
  });

  it('should fail creation of user because for password requirements', async () => {
    const user = await userFactory.attributes();
    const res = await request(app)
      .post('/users')
      .send({ ...user, password: '123456' });
    expect(res.status).toEqual(400);
    expect(res.body.message[0].msg).toEqual('Password must be at least 8 characters in length.');
  });

  it('should fail creation of user when the email exists in the database', async () => {
    const user = await userFactory.create();
    const res = await request(app)
      .post('/users')
      .send(user.dataValues);
    expect(res.status).toEqual(422);
    expect(res.body.message).toEqual('the email entered already exists!');
  });

  it('should fail when the last name is empty', async () => {
    const user = await userFactory.attributes();
    const res = await request(app)
      .post('/users')
      .send({ ...user, lastName: '' });
    expect(res.status).toEqual(400);
    expect(res.body.message[0].msg).toEqual('lastName is required.');
  });
});

describe('User Sign-In', () => {
  it('user should authenticate correctly', async () => {
    const user = await userFactory.create({ password: helpers.encryptPassword('ubuntu2018') });
    const res = await request(app)
      .post('/users/sessions')
      .send({ email: user.email, password: 'ubuntu2018' });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  it('user should fail because the data does not exist', async () => {
    const user = await userFactory.attributes();
    const res = await request(app)
      .post('/users/sessions')
      .send({ email: user.email, password: user.password });
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('incorrect username or password');
  });
});
