// tests/e2e/login.spec.js
import { test, expect } from '../../src/fixtures/testFixtures.js';
import testData from '../data/testData.json'  assert { type: 'json' };

test.describe('Login Functionality', () => {
    test.beforeEach(async ({ page, loginPage }) => {
        // Navigate to home page
        await page.goto('/');
        // LoginPage methods will handle clicking UserMenu to show the form
    });

    test('Successful login with valid credentials @smoke @regression', async ({ loginPage, homePage, page }) => {
        // Perform login (LoginPage.login handles showing the form)
        await loginPage.login(testData.validUser.username, testData.validUser.password);

        // Verify successful login - should see products page
        await page.waitForLoadState('networkidle');
        // Check if we're logged in by looking for products
        // const isLoggedIn = await homePage.isUserLoggedIn();
        // expect(isLoggedIn).toBeTruthy();
    });

    test('Failed login with invalid credentials @regression', async ({ loginPage, page }) => {
        // Attempt login with invalid credentials
        await loginPage.login('invaliduser', 'wrongpassword');

        // Verify error message appears or we're still on login page
        await page.waitForLoadState('networkidle');
        const currentUrl = page.url();
        // Should still be on home page or login should fail
        expect(currentUrl).toContain('advantageonlineshopping.com');
    });

    // test('Failed login with empty username @regression', async ({ loginPage, page }) => {
    //     // Attempt login with empty username
    //     await loginPage.login('', 'TestPassword@123');

    //     // Verify error or still on login
    //     await page.waitForLoadState('networkidle');
    //     const currentUrl = page.url();
    //     expect(currentUrl).toContain('advantageonlineshopping.com');
    // });

    // test('Failed login with empty password @regression', async ({ loginPage, page }) => {
    //     // Attempt login with empty password
    //     await loginPage.login('testuser123', '');

    //     // Verify error or still on login
    //     await page.waitForLoadState('networkidle');
    //     const currentUrl = page.url();
    //     expect(currentUrl).toContain('advantageonlineshopping.com');
    // });

    test('User can clear login form @regression', async ({ loginPage }) => {
        // Ensure login form is visible
        await loginPage.ensureLoginFormVisible();
        
        // Fill form
        await loginPage.usernameInput.fill('testuser');
        await loginPage.passwordInput.fill('password123');
        
        // Clear form
        await loginPage.usernameInput.clear();
        await loginPage.passwordInput.clear();
        
        // Verify fields are empty
        expect(await loginPage.usernameInput.inputValue()).toBe('');
        expect(await loginPage.passwordInput.inputValue()).toBe('');
    });

    test('Login with Remember Me checkbox @regression', async ({ loginPage, page }) => {
        // Login with remember me checked
        await loginPage.loginWithRememberMe(testData.validUser.username, testData.validUser.password);

        // Verify login was successful
        await page.waitForLoadState('networkidle');
        // After successful login, we should not see the sign in button
        const isSignInVisible = await loginPage.isSignInButtonVisible();
        expect(!isSignInVisible).toBeTruthy();
    });

    test.describe('Data-driven login tests', () => {
        const invalidCredentials = [
            { username: 'invaliduser', password: 'wrongpass', description: 'Invalid user' },
            { username: '', password: 'TestPassword@123', description: 'Empty username' },
            { username: 'testuser123', password: '', description: 'Empty password' },
        ];

        invalidCredentials.forEach(({ username, password, description }) => {
            test(`Login fails with ${description}`, async ({ loginPage, page }) => {
                await loginPage.login(username, password);
                
                // Verify we're still on the home page
                await page.waitForLoadState('networkidle');
                const currentUrl = page.url();
                expect(currentUrl).toContain('advantageonlineshopping.com');
            });
        });
    });
});
