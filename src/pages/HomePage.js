// src/pages/HomePage.js
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    
  //  this.welcomeMessage = page.locator('.welcome-message');

    this.welcomeMessage = page.locator('#inventory_filter_container > div');
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