You're absolutely right! Let me rebuild the framework in JavaScript as you requested.

## JavaScript Test Automation Framework with Playwright

Here's the complete framework structure in JavaScript:

```
playwright-automation-framework/
├── src/
│   ├── pages/
│   │   ├── BasePage.js
│   │   ├── LoginPage.js
│   │   └── HomePage.js
│   ├── components/
│   │   ├── NavigationBar.js
│   │   └── SearchBar.js
│   ├── fixtures/
│   │   └── testFixtures.js
│   ├── utils/
│   │   ├── DataGenerator.js
│   │   ├── ApiHelper.js
│   │   └── FileHelper.js
│   ├── config/
│   │   ├── config.js
│   │   └── environments.js
├── tests/
│   ├── e2e/
│   │   ├── login.spec.js
│   │   └── search.spec.js
│   ├── api/
│   │   └── api.spec.js
│   └── data/
│       └── testData.json
├── playwright.config.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## Implementation

### 1. Package.json

```json
{
  "name": "playwright-automation-framework",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:chrome": "playwright test --project=chromium",
    "test:parallel": "playwright test --workers=4",
    "test:tag": "playwright test --grep @smoke",
    "report": "allure generate allure-results --clean -o allure-report && allure open allure-report",
    "lint": "eslint . --ext .js",
    "format": "prettier --write ."
  },
  "devDependencies": {
    "@playwright/test": "^1.45.0",
    "allure-playwright": "^2.15.0",
    "dotenv": "^16.4.0",
    "@faker-js/faker": "^8.4.0",
    "eslint": "^8.57.0",
    "prettier": "^3.3.0"
  }
}
```

### 2. Playwright Configuration

```javascript
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: false,
    }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://example.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
});
```

### 3. Base Page Object

```javascript
// src/pages/BasePage.js
import { allure } from 'allure-playwright';

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await allure.step(`Navigate to ${url}`, async () => {
      await this.page.goto(url);
    });
  }

  async waitForElement(locator, timeout = 10000) {
    await allure.step(`Wait for element: ${locator}`, async () => {
      await locator.waitFor({ timeout });
    });
  }

  async clickElement(locator) {
    await allure.step(`Click element: ${locator}`, async () => {
      await locator.click();
    });
  }

  async fillInput(locator, value) {
    await allure.step(`Fill input with: ${value}`, async () => {
      await locator.fill(value);
    });
  }

  async getText(locator) {
    return await allure.step(`Get text from element: ${locator}`, async () => {
      return await locator.textContent() || '';
    });
  }

  async takeScreenshot(name) {
    const screenshot = await this.page.screenshot();
    await allure.attachment(name, screenshot, 'image/png');
  }

  async selectOption(locator, value) {
    await allure.step(`Select option: ${value}`, async () => {
      await locator.selectOption(value);
    });
  }

  async isElementVisible(locator) {
    return await locator.isVisible();
  }

  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }
}
```

### 4. Page Object Example

```javascript
// src/pages/LoginPage.js
import { BasePage } from './BasePage.js';
import { allure } from 'allure-playwright';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define locators
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
    this.rememberMeCheckbox = page.locator('#remember-me');
  }

  async login(username, password) {
    await allure.step('Perform login', async () => {
      await this.fillInput(this.usernameInput, username);
      await this.fillInput(this.passwordInput, password);
      await this.clickElement(this.loginButton);
    });
  }

  async loginWithRememberMe(username, password) {
    await allure.step('Login with Remember Me', async () => {
      await this.fillInput(this.usernameInput, username);
      await this.fillInput(this.passwordInput, password);
      await this.clickElement(this.rememberMeCheckbox);
      await this.clickElement(this.loginButton);
    });
  }

  async getErrorMessage() {
    return await this.getText(this.errorMessage);
  }

  async isLoginButtonVisible() {
    return await this.isElementVisible(this.loginButton);
  }

  async clearLoginForm() {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }
}
```

### 5. Home Page Example

```javascript
// src/pages/HomePage.js
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    this.welcomeMessage = page.locator('.welcome-message');
    this.logoutButton = page.locator('#logout');
    this.userProfile = page.locator('.user-profile');
    this.searchBar = page.locator('#search');
  }

  async logout() {
    await this.clickElement(this.logoutButton);
  }

  async searchFor(searchTerm) {
    await this.fillInput(this.searchBar, searchTerm);
    await this.page.keyboard.press('Enter');
  }

  async getUserName() {
    return await this.getText(this.userProfile);
  }

  async isUserLoggedIn() {
    return await this.isElementVisible(this.logoutButton);
  }
}
```

### 6. Custom Test Fixtures

```javascript
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
```

### 7. Test Example

```javascript
// tests/e2e/login.spec.js
import { test, expect } from '../../src/fixtures/testFixtures.js';
import { allure } from 'allure-playwright';
import testData from '../data/testData.json' assert { type: 'json' };

test.describe('Login Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('Successful login with valid credentials @smoke @regression', async ({ loginPage, homePage }) => {
    await allure.epic('Authentication');
    await allure.feature('Login');
    await allure.story('Valid Login');
    
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    
    await expect(homePage.welcomeMessage).toBeVisible();
    await expect(homePage.welcomeMessage).toContainText('Welcome');
    
    await loginPage.takeScreenshot('successful-login');
  });

  test('Failed login with invalid credentials @regression', async ({ loginPage }) => {
    await allure.epic('Authentication');
    await allure.feature('Login');
    await allure.story('Invalid Login');
    
    await loginPage.login('invalid@user.com', 'wrongpassword');
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid credentials');
  });

  test.describe('Data-driven login tests', () => {
    const invalidCredentials = [
      { username: 'user1@test.com', password: 'wrong', error: 'Invalid password' },
      { username: 'invalid@test.com', password: 'pass123', error: 'User not found' },
      { username: '', password: 'pass123', error: 'Username required' },
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
```

### 8. Configuration Management

```javascript
// src/config/config.js
export const config = {
  defaultTimeout: 30000,
  retryCount: 2,
  headless: process.env.HEADLESS !== 'false',
  slowMo: parseInt(process.env.SLOW_MO || '0'),
  environments: {
    dev: {
      name: 'Development',
      baseUrl: process.env.DEV_URL || 'https://dev.example.com',
      apiUrl: process.env.DEV_API_URL || 'https://api.dev.example.com',
    },
    staging: {
      name: 'Staging',
      baseUrl: process.env.STAGING_URL || 'https://staging.example.com',
      apiUrl: process.env.STAGING_API_URL || 'https://api.staging.example.com',
    },
    production: {
      name: 'Production',
      baseUrl: process.env.PROD_URL || 'https://example.com',
      apiUrl: process.env.PROD_API_URL || 'https://api.example.com',
    },
  },
};

export function getEnvironment() {
  const env = process.env.TEST_ENV || 'dev';
  return config.environments[env];
}
```

### 9. Data Generator Utility

```javascript
// src/utils/DataGenerator.js
import { faker } from '@faker-js/faker';

export class DataGenerator {
  static generateUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({ length: 12 }),
      phone: faker.phone.number(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode(),
      }
    };
  }

  static generateProduct() {
    return {
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
      category: faker.commerce.department(),
      sku: faker.string.alphanumeric(8).toUpperCase(),
    };
  }

  static generateCreditCard() {
    return {
      number: faker.finance.creditCardNumber(),
      cvv: faker.finance.creditCardCVV(),
      expiryDate: faker.date.future(),
    };
  }
}
```

### 10. API Helper

```javascript
// src/utils/ApiHelper.js
export class ApiHelper {
  constructor(request) {
    this.request = request;
  }

  async createUser(userData) {
    const response = await this.request.post('/api/users', {
      data: userData,
    });
    return response.json();
  }

  async deleteUser(userId) {
    await this.request.delete(`/api/users/${userId}`);
  }

  async getAuthToken(username, password) {
    const response = await this.request.post('/api/auth/login', {
      data: { username, password },
    });
    const data = await response.json();
    return data.token;
  }

  async createTestData(endpoint, data) {
    const response = await this.request.post(`/api/${endpoint}`, {
      data: data,
    });
    return response.json();
  }

  async cleanupTestData(endpoint, id) {
    await this.request.delete(`/api/${endpoint}/${id}`);
  }
}
```

### 11. API Test Example

```javascript
// tests/api/api.spec.js
import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../src/utils/ApiHelper.js';
import { DataGenerator } from '../../src/utils/DataGenerator.js';

test.describe('API Tests', () => {
  let apiHelper;

  test.beforeAll(async ({ request }) => {
    apiHelper = new ApiHelper(request);
  });

  test('Create new user via API @api', async ({ request }) => {
    const userData = DataGenerator.generateUser();
    
    const response = await request.post('/api/users', {
      data: userData,
    });
    
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.email).toBe(userData.email);
  });

  test('Authentication flow @api @smoke', async () => {
    const token = await apiHelper.getAuthToken('test@example.com', 'password123');
    expect(token).toBeTruthy();
    expect(token.length).toBeGreaterThan(20);
  });
});
```

### 12. Test Data JSON

```json
// tests/data/testData.json
{
  "validUser": {
    "username": "test@example.com",
    "password": "Test@123"
  },
  "invalidUsers": [
    {
      "username": "invalid@example.com",
      "password": "wrong"
    },
    {
      "username": "",
      "password": "Test@123"
    }
  ],
  "products": [
    {
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics"
    },
    {
      "name": "Book",
      "price": 19.99,
      "category": "Education"
    }
  ]
}
```

### 13. File Helper Utility

```javascript
// src/utils/FileHelper.js
import fs from 'fs/promises';
import path from 'path';

export class FileHelper {
  static async readJSON(filePath) {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  }

  static async writeJSON(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  static async createScreenshotDir() {
    const dir = path.join(process.cwd(), 'screenshots');
    await fs.mkdir(dir, { recursive: true });
    return dir;
  }

  static async cleanDirectory(dirPath) {
    try {
      await fs.rm(dirPath, { recursive: true, force: true });
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      console.error(`Error cleaning directory: ${error}`);
    }
  }
}
```

### 14. Environment Variables

```bash
# .env
BASE_URL=https://example.com
DEV_URL=https://dev.example.com
STAGING_URL=https://staging.example.com
TEST_USERNAME=test@example.com
TEST_PASSWORD=Test@123
HEADLESS=true
SLOW_MO=0
TEST_ENV=dev
```

### 15. ESLint Configuration

```javascript
// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'warn',
    'no-unused-vars': 'warn',
  },
};
```

## Key Features

1. **Pure JavaScript**: No TypeScript compilation needed
2. **ES6 Modules**: Modern JavaScript with import/export
3. **Page Object Model**: Clean test structure
4. **Allure Reporting**: Beautiful test reports
5. **Data-Driven Testing**: Parameterized tests support
6. **API Testing**: Integrated API testing
7. **Auto-waiting**: Built-in smart waits
8. **Parallel Execution**: Fast test execution
9. **Cross-browser Testing**: Multiple browser support
10. **Environment Configuration**: Easy environment switching

## Running Tests

```bash
# Install dependencies
npm install

# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run smoke tests
npm run test:tag @smoke

# Generate Allure report
npm run report

# Run tests in parallel
npm run test:parallel
```

This JavaScript framework is production-ready, maintainable, and follows best practices while being easy to understand and extend.