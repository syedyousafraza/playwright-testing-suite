// src/pages/HomePage.js
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Elements visible after successful login
    this.welcomeMessage = page.locator('heading:has-text("POPULAR ITEMS")');
    this.logoutButton = page.locator('a:has-text("Logout")');
    this.userMenu = page.locator('a:has-text("UserMenu")');
    this.userMenuDropdown = page.locator('.ng-dropdown-menu');
    this.searchBar = page.locator('input[type="text"]').filter({ hasAttribute: 'placeholder', hasText: 'Search' });
    this.shoppingCart = page.locator('a:has-text("ShoppingCart")');
    this.products = page.locator('[class*="productItem"]');
  }

  async logout() {
    // Click on user menu first to reveal logout option
    await this.clickElement(this.userMenu);
    await this.page.waitForTimeout(500);
    await this.clickElement(this.logoutButton);
    await this.page.waitForLoadState('networkidle');
  }

  async searchFor(searchTerm) {
    await this.fillInput(this.searchBar, searchTerm);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async isUserLoggedIn() {
    // Check if the user menu is visible (indicates logged in state)
    return await this.isElementVisible(this.userMenu);
  }

  async viewProductDetails(productIndex = 0) {
    const productLinks = await this.products.nth(productIndex).locator('a').first();
    await this.clickElement(productLinks);
    await this.page.waitForLoadState('networkidle');
  }

  async addProductToCart(productIndex = 0) {
    const addButton = this.products.nth(productIndex).locator('button:has-text("Add to cart")');
    await this.clickElement(addButton);
    await this.page.waitForLoadState('networkidle');
  }
}