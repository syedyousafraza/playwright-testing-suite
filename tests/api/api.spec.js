
// tests/api/api.spec.js
import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../src/utils/ApiHelper';
import { DataGenerator } from '../../src/utils/DataGenerator';

test.describe('API Tests', () => {
  let apiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new ApiHelper(request);
//    await apiHelper.authenticate(); // Authenticate before each test
  });

  test.describe('User Management', () => {
    test('should create a new user', async () => {
      // Arrange
      const userData = DataGenerator.generateUser();

      // Act
      const response = await apiHelper.createUser(userData);

      // Assert
      expect(response).toHaveProperty('id');
      expect(response.name).toBe(userData.name);
      expect(response.createdAt).toBeDefined();
    });

    test('should retrieve a user', async () => {
      // Act
      const response = await apiHelper.getUser(2);

      // Assert
      expect(response.data).toBeDefined();
      expect(response.data.email).toMatch(/@.+\..+/);
    });

    test('should update a user', async () => {
      // Arrange
      const updateData = DataGenerator.generateUser();

      // Act
      const response = await apiHelper.updateUser(2, updateData);

      // Assert
      expect(response.updatedAt).toBeDefined();
      expect(response).toMatchObject(updateData);
    });

    test('should list users with pagination', async () => {
      // Act
      const response = await apiHelper.listUsers(1);

      // Assert
      expect(response.page).toBe(1);
      expect(response.data).toBeInstanceOf(Array);
      expect(response.data.length).toBeGreaterThan(0);
    });
  });

  test.describe('Authentication', () => {
    test('should login successfully', async () => {
      // Arrange
      const { email, password } = DataGenerator.generateLoginCredentials();

      // Act
      const response = await apiHelper.login(email, password);

      // Assert
      expect(response.token).toBeDefined();
      expect(response.token.length).toBeGreaterThan(10);
    });

    test('should register new user', async () => {
      // Arrange
      const registrationData = DataGenerator.generateRegistrationData();

      // Act
      const response = await apiHelper.register(
        registrationData.email,
        registrationData.password
      );

      // Assert
      expect(response.id).toBeDefined();
      expect(response.token).toBeDefined();
    });
  });

  test.describe('Error Handling', () => {
    test('should handle invalid user ID gracefully', async () => {
      // Act & Assert
      await expect(apiHelper.getUser(999999)).rejects.toThrow('API Request Failed');
    });

    test('should handle invalid login credentials', async () => {
      // Act & Assert
      await expect(
        apiHelper.login('invalid@email.com', 'wrongpassword')
      ).rejects.toThrow('API Request Failed');
    });
  });
});