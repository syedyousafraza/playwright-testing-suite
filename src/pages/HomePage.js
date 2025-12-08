// src/pages/HomePage.js
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
    // Products title element visible after successful login
    this.welcomeMessage = page.locator('[data-test="title"]');
    this.logoutButton = page.locator('#logout_sidebar_link');
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