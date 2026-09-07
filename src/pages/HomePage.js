// src/pages/HomePage.js
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Elements visible after successful login
    this.welcomeMessage = page.getByRole('link', { name: 'POPULAR ITEMS', exact: true });
    this.logoutButton = page.getByRole('link', { name: 'Logout', exact: true });
    this.userMenu = page.getByRole('link', { name: 'UserMenu', exact: true });
    this.userMenuDropdown = page.locator('.ng-dropdown-menu');
    this.searchBar = page.getByRole('textbox', { name: 'Search AdvantageOnlineShopping.com' });
    this.shoppingCart = page.getByRole('link', { name: 'ShoppingCart', exact: true });
    this.products = page.locator('[class*="productItem"]');
  }

  async logout() {
    // Click on user menu first to reveal logout option
    await this.userMenu.click();
    await this.logoutButton.click();
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