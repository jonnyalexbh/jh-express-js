const faker = require('faker');

exports.user = {
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: `${faker.random.alphaNumeric(10)}@wolox.co`,
  password: faker.random.alphaNumeric(10)
};
