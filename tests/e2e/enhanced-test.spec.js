// // tests/e2e/enhanced-test.spec.js
// import { test, expect } from '@playwright/test';

// test.describe('Enhanced Test Example', () => {
//   // Use test.step for better reporting in HTML report
//   test('Complete user journey @smoke', async ({ page }) => {
//     await test.step('Navigate to homepage', async () => {
//       await page.goto('/');
//       await expect(page).toHaveTitle(/Home/);
//     });

//     await test.step('Search for product', async () => {
//       await page.fill('#search', 'laptop');
//       await page.press('#search', 'Enter');
//       await page.waitForSelector('.search-results');
//     });

//     await test.step('Add product to cart', async () => {
//       await page.click('.product-card:first-child .add-to-cart');
//       await expect(page.locator('.cart-count')).toHaveText('1');
//     });

//     // Attach screenshot to test report
//     await page.screenshot({ path: 'test-results/user-journey.png', fullPage: true });
//   });

//   // Use test.info() for test metadata
//   test('Test with metadata', async ({ page }, testInfo) => {
//     console.log(`Running ${testInfo.title}`);
//     console.log(`Test file: ${testInfo.file}`);
//     console.log(`Project: ${testInfo.project.name}`);
    
//     await page.goto('/');
    
//     // Attach files to test results
//     await testInfo.attach('screenshot', {
//       body: await page.screenshot(),
//       contentType: 'image/png'
//     });
//   });
// });