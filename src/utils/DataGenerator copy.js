
// src/utils/DataGenerator.js
import { faker } from '@faker-js/faker';

export class DataGenerator {
  static generateUser(overrides = {}) {
    return {
      name: `${faker.person.firstName()} ${faker.person.lastName()}`,
      email: faker.internet.email(),
      job: faker.person.jobTitle(),
      ...overrides
    };
  }

  static generateLoginCredentials() {
    return {
      email: 'eve.holt@reqres.in', // Using known working credentials for reqres.in
      password: 'cityslicka'
    };
  }

  static generateRegistrationData() {
    return {
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 })
    };
  }
}