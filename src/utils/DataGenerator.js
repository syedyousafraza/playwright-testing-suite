// src/utils/DataGenerator.js
import { faker } from '@faker-js/faker';

export class DataGenerator {
  static generateUser() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
      phone: faker.phone.number(),
      username: faker.internet.username(),
      website: faker.internet.domainName(),
    };
  }

  static generateLoginCredentials() {
    return {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
    };
  }

  static generateRegistrationData() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
      username: faker.internet.username(),
    };
  }

  static generateProduct() {
    return {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      sku: faker.string.alphanumeric(8).toUpperCase(),
    };
  }

  static generateCreditCard() {
    return {
      number: faker.finance.creditCardNumber(),
      cvv: faker.finance.creditCardCVV(),
      expiryDate: faker.date.future(),
    };
  }
}