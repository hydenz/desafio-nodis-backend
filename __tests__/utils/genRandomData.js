const faker = require('faker');
faker.seed(Math.round(Math.random() * 1000));

const genRandomEmail = () => ({
  from: faker.internet.email(),
  to: faker.internet.email(),
  body: faker.lorem.paragraph(),
});

const genRandomProduct = () => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  gtin13: Math.floor(Math.random() * 10000000000000).toString(),
  images: Array(5).fill(faker.system.commonFileName('webp')),
  price: faker.datatype.number({ min: 1 }),
  quantity: faker.datatype.number({ min: 1 }),
  status: faker.helpers.randomize(['AVAILABLE', 'UNAVAILABLE']),
});

module.exports = { genRandomEmail, genRandomProduct };
