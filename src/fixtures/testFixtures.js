// src/fixtures/testFixtures.js
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  // Auto-login fixture
  authenticatedPage: async ({ page, loginPage }, use) => {
    await page.goto('/login');
    await loginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
    await use(page);
  },
});

export { expect } from '@playwright/test';