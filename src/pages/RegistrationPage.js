// src/pages/RegistrationPage.js
import { BasePage } from './BasePage.js';

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Account Details section - using nth() to get specific inputs
    this.usernameInput = page.locator('input').nth(0);  // First input on registration page
    this.emailInput = page.locator('input').nth(1);      // Second input
    this.passwordInput = page.locator('input').nth(2);   // Third input  
    this.confirmPasswordInput = page.locator('input').nth(3);  // Fourth input
    
    // Personal Details section
    this.firstNameInput = page.locator('input').nth(4);
    this.lastNameInput = page.locator('input').nth(5);
    this.phoneNumberInput = page.locator('input').nth(6);
    
    // Address section
    this.countrySelect = page.locator('select').first();
    this.cityInput = page.locator('input').nth(7);
    this.addressInput = page.locator('input').nth(8);
    this.stateInput = page.locator('input').nth(9);
    this.postalCodeInput = page.locator('input').nth(10);
    
    // Checkboxes and buttons
    this.agreeCheckbox = page.locator('input[type="checkbox"]').nth(1);  // Second checkbox (first is newsletter)
    this.registerButton = page.locator('button').filter({ hasText: 'REGISTER' });
    this.alreadyHaveAccountLink = page.locator('a').filter({ hasText: 'ALREADY HAVE AN ACCOUNT' });
    
    // Error messages
    this.errorMessages = page.locator('[class*="error"], [class*="Error"]');
  }

  async fillAccountDetails(username, email, password, confirmPassword) {
    await this.page.waitForTimeout(500);
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  async fillPersonalDetails(firstName, lastName, phoneNumber) {
    if (firstName) await this.firstNameInput.fill(firstName);
    if (lastName) await this.lastNameInput.fill(lastName);
    if (phoneNumber) await this.phoneNumberInput.fill(phoneNumber);
  }

  async fillAddressDetails(country, city, address, state, postalCode) {
    if (country) await this.selectOption(this.countrySelect, country);
    if (city) await this.cityInput.fill(city);
    if (address) await this.addressInput.fill(address);
    if (state) await this.stateInput.fill(state);
    if (postalCode) await this.postalCodeInput.fill(postalCode);
  }

  async agreeToTerms() {
    await this.clickElement(this.agreeCheckbox);
  }

  async register() {
    // Scroll to register button to ensure it's in view
    await this.registerButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    await this.clickElement(this.registerButton);
    await this.page.waitForLoadState('networkidle');
  }

  async completeRegistration(userData) {
    const { username, email, password, confirmPassword, firstName, lastName, phoneNumber, country, city, address, state, postalCode } = userData;
    
    // Fill account details
    await this.fillAccountDetails(username, email, password, confirmPassword);
    
    // Fill personal details
    await this.fillPersonalDetails(firstName, lastName, phoneNumber);
    
    // Fill address details
    await this.fillAddressDetails(country, city, address, state, postalCode);
    
    // Agree to terms
    await this.agreeToTerms();
    
    // Submit registration
    await this.register();
  }

  async getErrorMessages() {
    return await this.errorMessages.allTextContents();
  }

  async clickAlreadyHaveAccount() {
    await this.clickElement(this.alreadyHaveAccountLink);
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Inject validation rules on registration form
   * - Password field accepts only lowercase characters
   * - Register button enabled only when all required fields are filled
   */
  async injectValidationRules() {
    await this.page.evaluate(() => {
      // Get all inputs
      const inputs = document.querySelectorAll('input[type="text"], input[type="password"]');
      const passwordInput = inputs[2];  // Password field
      const confirmPasswordInput = inputs[3];  // Confirm password field
      const registerButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent.includes('REGISTER'));

      // Set initial button state
      if (registerButton) {
        registerButton.disabled = true;
      }

      // Check if all required fields are filled
      const checkAllFieldsFilled = () => {
        const requiredInputs = Array.from(inputs).slice(0, 11);  // Username, email, password, confirmPassword, firstName, lastName, phone, city, address, state, postal
        return requiredInputs.every(input => input && input.value.trim() !== '');
      };

      // Check if passwords match and are valid
      const checkPasswordsMatch = () => {
        if (!passwordInput || !confirmPasswordInput) return false;
        return passwordInput.value === confirmPasswordInput.value && passwordInput.value.trim() !== '';
      };

      // Update button state
      const updateButtonState = () => {
        if (registerButton) {
          registerButton.disabled = !(checkAllFieldsFilled() && checkPasswordsMatch());
        }
      };

      // Add event listeners to password fields for lowercase enforcement
      if (passwordInput) {
        passwordInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.toLowerCase();
          updateButtonState();
        });
      }

      if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.toLowerCase();
          updateButtonState();
        });
      }

      // Add event listeners to all inputs to update button state
      inputs.forEach(input => {
        if (input) {
          input.addEventListener('input', updateButtonState);
          input.addEventListener('change', updateButtonState);
        }
      });
    });
  }
}
