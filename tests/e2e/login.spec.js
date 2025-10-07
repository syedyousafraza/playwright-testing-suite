// tests/e2e/login.spec.js
import { test, expect } from '../../src/fixtures/testFixtures.js';
import testData from '../data/testData.json'  assert { type: 'json' };

test.describe('Login Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/v1');
    });

    // src/fixtures/testFixtures.js
    // Here you might see that loginPage object is not created. 
    // Its testFixture.js which is doing it for us and if you see import we are not importing {test} from playwright but from 
    // testFixture. This way Cleaner: No object creation boilerplate
    //Consistent: Same setup for all tests
    //Isolated: Fresh objects for each test
    // Maintainable: Change object creation in one place


    test('Successful login with valid credentials @smoke @regression', async ({ loginPage, homePage }) => {
        // Perform login
        await loginPage.login(testData.validUser.username, testData.validUser.password);

        // Verify successful login
        await expect(homePage.welcomeMessage).toBeVisible();
        await expect(homePage.welcomeMessage).toContainText('Products');

        // Take screenshot if needed
        await loginPage.takeScreenshot('successful-login');
    });

    test('Failed login with invalid credentials @regression', async ({ loginPage }) => {
        // Attempt login with invalid credentials
        await loginPage.login('invalid@user.com', 'wrongpassword');

        // Verify error message
        const errorMessage = await loginPage.getErrorMessage();
        console.log("*****"+errorMessage);
        expect(errorMessage).toContain('Username and password do not match any user in this service');
    });

    test.describe('Data-driven login tests', () => {
        const invalidCredentials = [
            { username: 'user1@test.com', password: 'wrong', error: 'Username and password do not match any user in this service' },
            { username: 'standard_user', password: 'pass123', error: 'Epic sadface: Username and password do not match any user in this service' },
            { username: '', password: 'pass123', error: 'Epic sadface: Username is required' },
        ];

        invalidCredentials.forEach(({ username, password, error }) => {
            test(`Login fails with ${error}`, async ({ loginPage }) => {
                await loginPage.login(username, password);
                const errorMessage = await loginPage.getErrorMessage();
                expect(errorMessage).toContain(error);
            });
        });
    });
});