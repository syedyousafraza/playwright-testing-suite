// // tests/e2e/example.spec.js
// import { test, expect } from '@playwright/test';

// test('Navigate to home page', async ({ page, baseURL }) => {
//   // baseURL is automatically available from playwright.config.js
//   await page.goto('/'); // This will go to the baseURL
  
//   // Or you can use the full URL
//   console.log(`Testing on: ${baseURL}`);
// });

// test('Use API URL in tests', async ({ page, apiUrl }) => {
//   // apiUrl is passed through the use object in config
//   console.log(`API URL: ${apiUrl}`);
  
//   // You can use it for API calls
//   const response = await page.request.get(`${apiUrl}/users`);
//   expect(response.ok()).toBeTruthy();
// });