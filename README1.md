# Playwright JavaScript Test Automation Framework

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Core Components](#core-components)
- [Running Tests](#running-tests)
- [Framework Features](#framework-features)
- [Best Practices](#best-practices)

## 🎯 Overview

This is a modern, scalable test automation framework built with Playwright and JavaScript, featuring:
- Page Object Model (POM) design pattern
- Custom fixtures for dependency injection
- Data-driven testing support
- Cross-browser testing capabilities
- Parallel execution support
- Built-in reporting with screenshots and videos

## 🏗️ Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Test Execution Layer                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │   E2E Tests  │    │  API Tests   │    │ Visual Tests │     │
│  │  login.spec  │    │  api.spec    │    │   (future)   │     │
│  └──────┬───────┘    └──────┬───────┘    └──────┬───────┘     │
│         │                    │                    │              │
├─────────┴────────────────────┴───────────────────┴──────────────┤
│                        Fixture Layer                             │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐    │
│  │              Custom Test Fixtures                       │    │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────────┐  │    │
│  │  │loginPage │  │ homePage │  │authenticatedPage  │  │    │
│  │  └──────────┘  └──────────┘  └────────────────────┘  │    │
│  └────────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────────┤
│                      Page Object Layer                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │   BasePage   │◄───┤  LoginPage   │    │   HomePage   │     │
│  │  (Abstract)  │    └──────────────┘    └──────────────┘     │
│  └──────────────┘                                               │
├─────────────────────────────────────────────────────────────────┤
│                      Utility Layer                               │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐     │
│  │DataGenerator │    │  ApiHelper   │    │ FileHelper   │     │
│  └──────────────┘    └──────────────┘    └──────────────┘     │
├─────────────────────────────────────────────────────────────────┤
│                    Configuration Layer                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────┐    ┌─────────────────────────┐       │
│  │ playwright.config.js  │    │    .env variables       │       │
│  └──────────────────────┘    └─────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### Test Execution Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   npm test  │────▶│  Playwright │────▶│   Fixtures  │────▶│ Page Objects│
└─────────────┘     │   Config    │     │   Created   │     │   Called    │
                    └─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Reports   │◀────│    Tests    │◀────│   Actions   │◀────│   Locators  │
│  Generated  │     │   Execute   │     │  Performed  │     │    Used     │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

## 📁 Project Structure

```
playwright-javascript/
├── src/
│   ├── pages/              # Page Object Models
│   │   ├── BasePage.js     # Base class with common methods
│   │   ├── LoginPage.js    # Login page specific methods
│   │   └── HomePage.js     # Home page specific methods
│   │
│   ├── fixtures/           # Custom test fixtures
│   │   └── testFixtures.js # Dependency injection setup
│   │
│   ├── utils/              # Utility functions
│   │   ├── DataGenerator.js # Test data generation
│   │   ├── ApiHelper.js    # API testing utilities
│   │   └── FileHelper.js   # File operations
│   │
│   └── config/             # Configuration files
│       └── config.js       # Environment configurations
│
├── tests/
│   ├── e2e/               # End-to-end tests
│   │   └── login.spec.js  # Login functionality tests
│   │
│   ├── api/               # API tests
│   │   └── api.spec.js    # API test scenarios
│   │
│   └── data/              # Test data
│       └── testData.json  # Static test data
│
├── playwright.config.js    # Playwright configuration
├── package.json           # Project dependencies
├── .env                   # Environment variables
├── .eslintrc.js          # ESLint configuration
└── README.md             # Project documentation
```

## 🚀 Installation

### Prerequisites
- Node.js 
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd playwright-javascript
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Configure environment variables**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Edit .env with your values
   BASE_URL=https://www.saucedemo.com
   TEST_USERNAME=standard_user
   TEST_PASSWORD=secret_sauce
   ```

## 🔧 Core Components

### 1. Page Object Model (POM)

#### Base Page Class
```javascript
// Provides common functionality for all pages
export class BasePage {
  - navigate(url)
  - waitForElement(locator, timeout)
  - clickElement(locator)
  - fillInput(locator, value)
  - getText(locator)
  - takeScreenshot(name)
}
```

#### Page Object Example
```javascript
// LoginPage inherits from BasePage
export class LoginPage extends BasePage {
  // Locators
  - usernameInput
  - passwordInput
  - loginButton
  
  // Methods
  - login(username, password)
  - getErrorMessage()
  - clearLoginForm()
}
```

### 2. Custom Fixtures

The fixture system provides automatic dependency injection:

```
┌─────────────────────────────────────────────┐
│              Test Request                    │
│         { loginPage, homePage }              │
└─────────────────┬───────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│           Fixture Factory                    │
│  1. Creates browser page                     │
│  2. Instantiates LoginPage(page)            │
│  3. Instantiates HomePage(page)             │
│  4. Injects into test                       │
└─────────────────────────────────────────────┘
```

### 3. Test Structure

```javascript
test.describe('Feature') → Test Suite
  ├── test.beforeEach() → Setup
  ├── test('Scenario 1') → Test Case
  ├── test('Scenario 2') → Test Case
  └── test.afterEach() → Cleanup
```

## 🏃 Running Tests

### Command Reference

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with browser UI |
| `npm run test:chrome` | Run tests in Chrome only |
| `npm run test:parallel` | Run tests in parallel (4 workers) |
| `npm run test:tag @smoke` | Run smoke tests only |
| `npm run test:tag1 @regression` | Run regression tests |

### Execution Examples

```bash
# Run specific test file
npx playwright test tests/e2e/login.spec.js

# Run tests with specific tag
npm run test:tag @smoke

# Debug mode
npx playwright test --debug

# Generate report
npx playwright show-report
```

## 🎯 Framework Features

### 1. Data-Driven Testing

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ testData.json│────▶│ Test Loop    │────▶│ Multiple     │
│   (Array)    │     │ forEach()    │     │ Test Cases   │
└──────────────┘     └──────────────┘     └──────────────┘
```

### 2. Parallel Execution

```
         ┌─────── Worker 1 ───────┐
         │  ▶ login.spec.js       │
Main ────┼─────── Worker 2 ───────┼──── Results
Process  │  ▶ search.spec.js      │    Aggregated
         ├─────── Worker 3 ───────┤
         │  ▶ checkout.spec.js    │
         └─────── Worker 4 ───────┘
```

### 3. Reporting Structure

```
HTML Report/
├── Summary Dashboard
│   ├── Pass/Fail Stats
│   ├── Duration Metrics
│   └── Browser Distribution
│
├── Test Details
│   ├── Test Steps
│   ├── Screenshots (on failure)
│   ├── Videos (on failure)
│   └── Traces
│
└── Trends
    └── Historical Data
```

## 📚 Best Practices

### 1. Test Organization
- One feature per test file
- Use descriptive test names
- Group related tests with `test.describe()`
- Tag tests appropriately (@smoke, @regression)

### 2. Page Objects
- Keep page objects focused on a single page
- Don't include assertions in page objects
- Use meaningful method names
- Encapsulate locators as private properties

### 3. Test Data
- Use external data files for test data
- Generate dynamic data when needed
- Keep sensitive data in environment variables
- Clean up test data after execution

### 4. Fixtures
- Create reusable fixtures for common setups
- Use fixture dependencies wisely
- Keep fixtures simple and focused
- Document fixture purpose and usage

## 🔍 Debugging

### Visual Debugging Tools

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   VS Code       │     │  Playwright     │     │   Browser       │
│   Debugger      │────▶│  Inspector      │────▶│   DevTools      │
│   Breakpoints   │     │  Step-through   │     │   Console       │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Debug Commands
```bash
# Debug specific test
npx playwright test login.spec.js --debug

# Show browser
npx playwright test --headed --slow-mo=1000

# Trace viewer
npx playwright show-trace trace.zip
```

## 📊 Sample Test Execution Report

```
Test Results Summary
═══════════════════════════════════════════════════════════════

✅ Passed:  15/18 tests
❌ Failed:  3/18 tests
  Duration: 45.2s
Browsers: Chrome, Firefox, Safari

Failed Tests:
├── login.spec.js
│   └── ❌ Data-driven login tests › Login fails with User not found
├── checkout.spec.js
│   └── ❌ Checkout flow › Should display error for invalid card
└── search.spec.js
    └── ❌ Search functionality › Should show no results message

Tag Summary:
├── @smoke: 5/5 ✅
├── @regression: 10/13 ⚠️
└── @critical: 3/3 ✅
```

## 🤝 Contributing

1. Follow the established project structure
2. Write tests for new features
3. Ensure all tests pass before submitting PR
4. Update documentation as needed
5. Follow ESLint rules

## 📝 License

This project is licensed under the ISC License.

---

For more information about Playwright, visit [playwright.dev](https://playwright.dev)