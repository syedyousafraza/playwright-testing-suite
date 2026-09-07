// tests/e2e/registration.spec.js
import { test, expect } from '../../src/fixtures/testFixtures.js';

test.describe('User Registration', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('User can navigate to registration page @smoke @regression', async ({ page, loginPage }) => {
        // Click UserMenu to open login form
        await loginPage.ensureLoginFormVisible();
        
        // Click CREATE NEW ACCOUNT link
        await loginPage.createAccountLink.click();
        
        // Verify navigation to registration page
        await expect(page).toHaveURL(/.*#\/register/);
    });

    test('Successfully register new account with all details @smoke @regression', async ({ page, registrationPage }) => {
        // Navigate to registration page
        await page.goto('/#/register');
        
        // Fill form fields using direct locators
        const timestamp = Date.now();
        const username = `t${timestamp}`;
        const email = `testuser_${timestamp}@test.com`;
        const password = 'Test1234';
        
        await registrationPage.completeRegistration({
            username,
            email,
            password,
            confirmPassword: password,
            firstName: 'John',
            lastName: 'Doe',
            phoneNumber: '1234567890',
            country: 'United States',
            city: 'New York',
            address: '123 Main Street',
            state: 'NY',
            postalCode: '10001',
        });
        
        // Verify successful registration - should navigate away from register page
        await expect(page).not.toHaveURL(/.*#\/register/, { timeout: 60000 });
    });

    test('Registration fails with mismatched passwords @regression', async ({ page, registrationPage }) => {
        // Navigate to registration page
        await page.goto('/#/register');
        
        const timestamp = Date.now();
    //    const username = `testuser_${timestamp}`;
                const username = `testuser_`;

        const email = `testuser_${timestamp}@test.com`;
        
        await registrationPage.fillAccountDetails(username, email, 'test1234', 'different5678');
        await registrationPage.fillPersonalDetails('John', 'Doe', '1234567890');
        await registrationPage.fillAddressDetails('United States', 'New York', '123 Main Street', 'NY', '10001');
        await registrationPage.agreeToTerms();

        await expect(registrationPage.registerButton).toBeDisabled();
        
        // Verify still on registration page
        await expect(page).toHaveURL(/.*#\/register/);
    });

    test('Registration fails with empty required fields @regression', async ({ page, registrationPage }) => {
        // Navigate to registration page
        await page.goto('/#/register');
        // Verify register button is disabled when no fields are filled
        await expect(registrationPage.registerButton).toBeDisabled();
        
        // Verify still on registration page
        await expect(page).toHaveURL(/.*#\/register/);
    });

    test('User can go back to login from registration page @regression', async ({ page, registrationPage }) => {
        // Navigate to registration page
        await page.goto('/#/register');
        // Verify we're on registration page
        await expect(page).toHaveURL(/.*#\/register/);
        
        await expect(registrationPage.homeBreadcrumbLink).toBeVisible();
        await registrationPage.goToHome();
        await expect(page.locator('#hrefUserIcon')).toBeVisible();
    });
});
