// src/fixtures/testFixtures.js
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { RegistrationPage } from '../pages/RegistrationPage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },

  // Auto-login fixture
  authenticatedPage: async ({ page, loginPage }, use) => {
    await page.goto('/');
    await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
    await use(page);
  },
});

export { expect } from '@playwright/test';