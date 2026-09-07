// src/pages/RegistrationPage.js
import { BasePage } from './BasePage.js';

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    
    // Account details
    this.usernameInput = page.locator('input[name="usernameRegisterPage"]');
    this.emailInput = page.locator('input[name="emailRegisterPage"]');
    this.passwordInput = page.locator('input[name="passwordRegisterPage"]');
    this.confirmPasswordInput = page.locator('input[name="confirm_passwordRegisterPage"]');
    
    // Personal Details section
    this.firstNameInput = page.locator('input[name="first_nameRegisterPage"]');
    this.lastNameInput = page.locator('input[name="last_nameRegisterPage"]');
    this.phoneNumberInput = page.locator('input[name="phone_numberRegisterPage"]');
    
    // Address section
    this.countrySelect = page.locator('select[name="countryListboxRegisterPage"]');
    this.cityInput = page.locator('input[name="cityRegisterPage"]');
    this.addressInput = page.locator('input[name="addressRegisterPage"]');
    this.stateInput = page.locator('input[name="state_/_province_/_regionRegisterPage"]');
    this.postalCodeInput = page.locator('input[name="postal_codeRegisterPage"]');
    
    // Checkboxes and buttons
    this.agreeCheckbox = page.locator('input[name="i_agree"]');
    this.registerButton = page.getByRole('button', { name: 'REGISTER', exact: true });
    this.homeBreadcrumbLink = page.getByRole('link', { name: 'HOME/', exact: true });
    
    // Error messages
    this.errorMessages = page.locator('[class*="error"], [class*="Error"]');
  }

  async fillAccountDetails(username, email, password, confirmPassword) {
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
    await this.registerButton.click();
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

  async goToHome() {
    await this.homeBreadcrumbLink.click();
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
