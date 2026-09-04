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
    this.usernameInput = page.locator('input[type="text"]').first();
    this.passwordInput = page.locator('input[type="password"]');
    this.signInButton = page.getByRole('button', { name: 'SIGN IN' });
    this.rememberMeCheckbox = page.locator('input[type="checkbox"]');
    this.createAccountLink = page.getByRole('link', { name: 'CREATE NEW ACCOUNT' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot your password?' });
  }

  async ensureLoginFormVisible() {
    // First ensure page is fully loaded
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(1000);
    
    // Click on UserMenu using the correct ID (#hrefUserIcon)
    await this.page.locator('#hrefUserIcon').click();
    
    // Wait for Angular to stabilize
    await this.page.evaluate(async () => {
      if (!window.ng) return;
      
      return new Promise((resolve) => {
        const injector = ng.probe(document.documentElement).injector();
        const $http = injector.get('$http');
        const $rootScope = injector.get('$rootScope');
        
        const checkComplete = () => {
          if ($http.pendingRequests.length === 0 && !$rootScope.$$phase) {
            resolve();
          } else {
            setTimeout(checkComplete, 100);
          }
        };
        
        setTimeout(resolve, 5000);
        checkComplete();
      });
    });
    
    // Wait for the form to be rendered and visible
    await this.usernameInput.waitFor({ state: 'visible', timeout: 5000 });
  }

  async login(username, password) {
    // Ensure form is visible first
    await this.ensureLoginFormVisible();
    
    // Wait a bit more for form to be fully interactive
    await this.page.waitForTimeout(500);
    
    // Fill credentials with explicit waits
    await this.usernameInput.waitFor({ state: 'visible', timeout: 3000 });
    await this.usernameInput.fill(username);
    
    await this.passwordInput.waitFor({ state: 'visible', timeout: 3000 });
    await this.passwordInput.fill(password);
    
    // Wait for button to be enabled and clickable
    await this.signInButton.waitFor({ state: 'visible', timeout: 3000 });
    await this.page.waitForTimeout(500);
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
    
    // Wait a bit more for form to be fully interactive
    await this.page.waitForTimeout(500);
    
    // Fill credentials
    await this.usernameInput.waitFor({ state: 'visible', timeout: 3000 });
    await this.usernameInput.fill(username);
    
    await this.passwordInput.waitFor({ state: 'visible', timeout: 3000 });
    await this.passwordInput.fill(password);
    
    // Check remember me
    await this.rememberMeCheckbox.waitFor({ state: 'visible', timeout: 3000 });
    await this.rememberMeCheckbox.click();
    
    // Click sign in button
    await this.signInButton.waitFor({ state: 'visible', timeout: 3000 });
    await this.page.waitForTimeout(500);
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