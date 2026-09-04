// src/pages/LoginPage.js
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Define locators for Advantage Online Shopping login form
    // The login form is rendered dynamically when UserMenu is clicked
    // Use CSS selector to find UserMenu link reliably
    this.userMenuLink = page.locator('nav a[role="link"]').filter({ hasText: 'USER' }).locator('..').first();
    this.userMenuLinkAlt = page.locator('nav li a:has(img)').filter({ hasText: 'USER' }).last();
    
    // Form inputs - these become visible after clicking UserMenu
    this.usernameInput = page.locator('input[name="username"]:visible').first();
    this.passwordInput = page.locator('input[name="password"]:visible').first();
    this.signInButton = page.getByRole('button', { name: 'SIGN IN' });
    this.rememberMeCheckbox = page.locator('input[type="checkbox"]:visible').first();
    this.createAccountLink = page.getByRole('link', { name: 'CREATE NEW ACCOUNT' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
  }

  async ensureLoginFormVisible() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.locator('.loader').waitFor({ state: 'hidden', timeout: 15000 }).catch(() => null);

    if (!(await this.usernameInput.isVisible())) {
      await this.page.locator('#hrefUserIcon').click({ force: true });
    }

    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async login(username, password) {
    // Ensure form is visible first
    await this.ensureLoginFormVisible();
    
    await this.usernameInput.fill(username);
    
    await this.passwordInput.fill(password);
    
    // Empty credentials are rejected by client-side validation, so there is no
    // request to submit in that case.
    await this.signInButton.waitFor({ state: 'visible', timeout: 3000 });
    if (!username || !password) {
      return;
    }

    // Wait for button to be enabled and clickable
    await this.page.waitForFunction(
      selector => !document.querySelector(selector)?.disabled,
      '#sign_in_btn',
      { timeout: 3000 }
    );
    await this.signInButton.click();
    
    // Wait for navigation
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    } catch (e) {
      // Navigation might not trigger, try domcontentloaded
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async loginWithRememberMe(username, password) {
    // Ensure form is visible first
    await this.ensureLoginFormVisible();
    
    // Fill credentials
    await this.usernameInput.fill(username);
    
    await this.passwordInput.fill(password);
    
    // Check remember me
    await this.rememberMeCheckbox.waitFor({ state: 'visible', timeout: 3000 });
    await this.rememberMeCheckbox.check();
    
    // Click sign in button
    await this.signInButton.waitFor({ state: 'visible', timeout: 3000 });
    await this.page.waitForFunction(
      selector => !document.querySelector(selector)?.disabled,
      '#sign_in_btn',
      { timeout: 3000 }
    );
    await this.signInButton.click();
    
    // Wait for navigation
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 10000 });
    } catch (e) {
      await this.page.waitForLoadState('domcontentloaded');
    }
  }

  async getErrorMessage() {
    // Look for error messages in the form
    const errorLocator = this.page.locator('.ng-binding').filter({ hasText: /error|invalid|incorrect/i });
    return await errorLocator.first().textContent();
  }

  async isSignInButtonVisible() {
    return await this.signInButton.isVisible();
  }

  async clearLoginForm() {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  async clickCreateAccount() {
    await this.clickElement(this.createAccountLink);
    await this.page.waitForLoadState('networkidle');
  }
}