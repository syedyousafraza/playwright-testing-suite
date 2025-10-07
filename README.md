## JavaScript Test Automation Framework with Playwright


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
5. **Data-Driven Testing**: Parameterized tests support
6. **API Testing**: Integrated API testing
7. **Performance-Testing**: Built-in smart waits
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

