// src/pages/BasePage.js
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url) {
    await this.page.goto(url);
  }

  async waitForElement(locator, timeout = 10000) {
    await locator.waitFor({ timeout });
  }

  async clickElement(locator) {
    await locator.click();
  }

  async fillInput(locator, value) {
    await locator.fill(value);
  }

  async getText(locator) {
    return await locator.textContent() || '';
  }

  async takeScreenshot(name) {
    return await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  async selectOption(locator, value) {
    await locator.selectOption(value);
  }

  async isElementVisible(locator) {
    return await locator.isVisible();
  }

  async waitForNavigation() {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle() {
    return await this.page.title();
  }

  async getUrl() {
    return this.page.url();
  }
}