
// tests/api/api.spec.js
// Using JSONPlaceholder (https://jsonplaceholder.typicode.com) as free public API for testing
import { test, expect } from '@playwright/test';
import { ApiHelper } from '../../src/utils/ApiHelper.js';

test.describe('API Tests', () => {
  let apiHelper;

  test.beforeEach(async ({ request }) => {
    apiHelper = new ApiHelper(request);
  });

  test.describe('User Management', () => {
    test('should retrieve an existing user', async () => {
      // JSONPlaceholder comes with pre-populated data (IDs 1-10)
      const response = await apiHelper.getUser(1);

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('name');
      expect(response).toHaveProperty('email');
    });

    test('should list all users', async () => {
      const response = await apiHelper.listUsers(1);

      expect(Array.isArray(response)).toBeTruthy();
      expect(response.length).toBeGreaterThan(0);
      expect(response[0]).toHaveProperty('id');
      expect(response[0]).toHaveProperty('name');
    });

    test('should create a new post (testing POST)', async () => {
      const postData = {
        title: 'Test Post Title',
        body: 'This is a test post body',
        userId: 1,
      };

      const response = await apiHelper.createPost(postData);

      expect(response).toHaveProperty('id');
      expect(response.title).toBe(postData.title);
      expect(response.body).toBe(postData.body);
    });

    test('should update a post (testing PUT)', async () => {
      const updateData = {
        title: 'Updated Post Title',
        body: 'Updated post body',
        userId: 1,
      };

      const response = await apiHelper.updatePost(1, updateData);

      expect(response).toHaveProperty('id');
      expect(response.title).toBe(updateData.title);
      expect(response.body).toBe(updateData.body);
    });

    test('should delete a post (testing DELETE)', async () => {
      const response = await apiHelper.deletePost(1);

      // JSONPlaceholder returns empty object on successful delete
      expect(response).toBeDefined();
    });
  });

  test.describe('Post Operations', () => {
    test('should retrieve a post', async () => {
      const response = await apiHelper.getPost(1);

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('title');
      expect(response).toHaveProperty('body');
      expect(response).toHaveProperty('userId');
    });

    test('should list all posts', async () => {
      const response = await apiHelper.listPosts();

      expect(Array.isArray(response)).toBeTruthy();
      expect(response.length).toBeGreaterThan(0);
      expect(response[0]).toHaveProperty('id');
      expect(response[0]).toHaveProperty('title');
    });
  });

  test.describe('Error Handling', () => {
    test('should handle invalid user ID gracefully', async () => {
      // JSONPlaceholder returns 404 for non-existent IDs
      // We test that the API helper properly throws an error on non-200 responses
      try {
        await apiHelper.getUser(999999);
        // Should not reach here
        expect(true).toBe(false);
      } catch (error) {
        expect(error.message).toContain('API Request Failed');
        expect(error.message).toContain('404');
      }
    });

    test('should handle requests correctly', async () => {
      // Test that API helper formats requests correctly
      const response = await apiHelper.getPost(5);

      expect(response).toHaveProperty('id');
      expect(response.id).toBe(5);
    });
  });

  test.describe('Generic Resource Operations', () => {
    test('should create a generic resource (POST)', async () => {
      const resourceData = {
        title: 'Generic Resource',
        body: 'Test resource',
        userId: 1,
      };

      const response = await apiHelper.createResource('posts', resourceData);

      expect(response).toHaveProperty('id');
      expect(response.title).toBe(resourceData.title);
    });

    test('should retrieve a generic resource (GET)', async () => {
      const response = await apiHelper.getResource('users', 2);

      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('name');
    });

    test('should delete a generic resource (DELETE)', async () => {
      const response = await apiHelper.deleteResource('posts', 5);

      expect(response).toBeDefined();
    });
  });
});