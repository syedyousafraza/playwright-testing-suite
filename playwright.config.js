// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import { getEnvironmentConfig } from './src/config/environments.js';
dotenv.config();

const environmentConfig = getEnvironmentConfig();


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/test-results.json' }],
  ],
  use: {
    baseURL: environmentConfig.baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 60000,
    ignoreHTTPSErrors: true,
  },
  projects: [
       {
      name: 'APITests',
      testMatch: /api\.spec\.js/,
      testDir: './tests'
    },
    {
      name: 'chromium',
      testIgnore: /api\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testIgnore: /api\.spec\.js/,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testIgnore: /api\.spec\.js/,
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile-Chrome',
      testIgnore: /api\.spec\.js/,
      use: { ...devices['Pixel 5'] },
    },
  ],
});