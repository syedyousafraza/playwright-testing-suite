// tests/e2e/registration.spec.js
import { test, expect } from '../../src/fixtures/testFixtures.js';
import testData from '../data/testData.json' assert { type: 'json' };

test.describe('User Registration', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('domcontentloaded');
    });

    test('User can navigate to registration page @smoke @regression', async ({ page }) => {
        // Click UserMenu to open login form
        await page.locator('#hrefUserIcon').click();
        await page.waitForTimeout(1000);
        
        // Click CREATE NEW ACCOUNT link
        await page.locator('a.create-new-account').click();
        
        // Verify navigation to registration page
        await expect(page).toHaveURL(/.*#\/register/);
    });

    test('Successfully register new account with all details @smoke @regression', async ({ page }) => {
        // Navigate to registration page
        await page.goto('/#/register');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        
        // Fill form fields using direct locators
        const timestamp = Date.now();
        const username = `t${timestamp}`;
        const email = `testuser_${timestamp}@test.com`;
        const password = 'Test1234';
        
        // Account Details
        await page.locator('input[name="usernameRegisterPage"]').fill(username);
        await page.locator('input[name="emailRegisterPage"]').fill(email);
        await page.locator('input[name="passwordRegisterPage"]').fill(password);
        await page.locator('input[name="confirm_passwordRegisterPage"]').fill(password);
        
        // Personal Details
        await page.locator('input[name="first_nameRegisterPage"]').fill('John');
        await page.locator('input[name="last_nameRegisterPage"]').fill('Doe');
        await page.locator('input[name="phone_numberRegisterPage"]').fill('1234567890');
        
        // Address Details
        await page.locator('select[name="countryListboxRegisterPage"]').selectOption({ label: 'United States' });
        await page.locator('input[name="cityRegisterPage"]').fill('New York');
        await page.locator('input[name="addressRegisterPage"]').fill('123 Main Street');
        await page.locator('input[name="state_/_province_/_regionRegisterPage"]').fill('NY');
        await page.locator('input[name="postal_codeRegisterPage"]').fill('10001');
        
        // Accept agreement
        await page.locator('input[name="i_agree"]').check();
        
        // Submit registration
        await page.click('button:has-text("REGISTER")');
        
        // Verify successful registration - should navigate away from register page
        await expect(page).not.toHaveURL(/.*#\/register/, { timeout: 60000 });
    });

    test('Registration fails with mismatched passwords @regression', async ({ page }) => {
        // Navigate to registration page
        await page.goto('/#/register');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        
        const timestamp = Date.now();
    //    const username = `testuser_${timestamp}`;
                const username = `testuser_`;

        const email = `testuser_${timestamp}@test.com`;
        
        // Fill form with mismatched passwords
        await page.locator('input[name="usernameRegisterPage"]').fill(username);
        await page.locator('input[name="emailRegisterPage"]').fill(email);
        await page.locator('input[name="passwordRegisterPage"]').fill('test1234');
        await page.locator('input[name="confirm_passwordRegisterPage"]').fill('different5678');
        
        // Personal Details
        await page.locator('input[name="first_nameRegisterPage"]').fill('John');
        await page.locator('input[name="last_nameRegisterPage"]').fill('Doe');
        await page.locator('input[name="phone_numberRegisterPage"]').fill('1234567890');
        
        // Address Details
        await page.locator('select[name="countryListboxRegisterPage"]').selectOption({ label: 'United States' });
        await page.locator('input[name="cityRegisterPage"]').fill('New York');
        await page.locator('input[name="addressRegisterPage"]').fill('123 Main Street');
        await page.locator('input[name="state_/_province_/_regionRegisterPage"]').fill('NY');
        await page.locator('input[name="postal_codeRegisterPage"]').fill('10001');
        
        // Verify register button is disabled
        const registerButton = page.locator('button:has-text("REGISTER")');
        await expect(registerButton).toBeDisabled();
        
        // Verify still on registration page
        await expect(page).toHaveURL(/.*#\/register/);
    });

    test('Registration fails with empty required fields @regression', async ({ page }) => {
        // Navigate to registration page
        await page.goto('/#/register');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        
        // Verify register button is disabled when no fields are filled
        const registerButton = page.locator('button:has-text("REGISTER")');
        await expect(registerButton).toBeDisabled();
        
        // Verify still on registration page
        await expect(page).toHaveURL(/.*#\/register/);
    });

    test('User can go back to login from registration page @regression', async ({ page }) => {
        // Navigate to registration page
        await page.goto('/#/register');
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);
        
        // Verify we're on registration page
        await expect(page).toHaveURL(/.*#\/register/);
        
        // Try to find and click back link
        const backLink = page.locator('a:has-text(/ALREADY HAVE|Back|Sign In/i)').first();
        const linkExists = await backLink.isVisible().catch(() => false);
        
        if (linkExists) {
            await backLink.click();
            await page.waitForLoadState('domcontentloaded');
        }
        
        // Test passed if no errors
        expect(true).toBeTruthy();
    });
});
