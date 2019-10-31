const { factory } = require('factory-girl'),
  faker = require('faker'),
  { User } = require('../../app/models');

factory.define('user', User, {
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  email: () => `${faker.random.alphaNumeric(10)}@wolox.co`,
  password: () => faker.random.alphaNumeric(10)
});

module.exports = {
  create: params => factory.create('user', params),
  createMany: () => factory.createMany('user', 5),
  build: params => factory.build('user', params),
  attributes: params => factory.attrs('user', params)
};
