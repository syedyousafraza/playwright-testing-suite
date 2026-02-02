// src/utils/ApiHelper.js
export class ApiHelper {
  constructor(request) {
    this.request = request;
    // Use JSONPlaceholder as default free API, can be overridden with API_URL env var
    this.baseURL = process.env.API_URL || 'https://jsonplaceholder.typicode.com';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  }

  async sendRequest(method, endpoint, data = null, headers = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const requestOptions = {
      headers: { ...this.defaultHeaders, ...headers },
      failOnStatusCode: false
    };

    if (data) {
      requestOptions.data = data;
    }

    const response = await this.request[method](url, requestOptions);
    
    if (!response.ok()) {
      throw new Error(`API Request Failed: ${method.toUpperCase()} ${endpoint} returned ${response.status()}`);
    }

    return response.json();
  }

  // User endpoints (adapted for JSONPlaceholder)
  async createUser(userData) {
    return this.sendRequest('post', '/users', userData);
  }

  async getUser(userId) {
    return this.sendRequest('get', `/users/${userId}`);
  }

  async updateUser(userId, userData) {
    return this.sendRequest('put', `/users/${userId}`, userData);
  }

  async deleteUser(userId) {
    return this.sendRequest('delete', `/users/${userId}`);
  }

  async listUsers(page = 1) {
    // JSONPlaceholder doesn't support pagination, returns all users
    return this.sendRequest('get', '/users');
  }

  // Post endpoints (used for testing CRUD operations)
  async createPost(postData) {
    return this.sendRequest('post', '/posts', postData);
  }

  async getPost(postId) {
    return this.sendRequest('get', `/posts/${postId}`);
  }

  async updatePost(postId, postData) {
    return this.sendRequest('put', `/posts/${postId}`, postData);
  }

  async deletePost(postId) {
    return this.sendRequest('delete', `/posts/${postId}`);
  }

  async listPosts(page = 1) {
    return this.sendRequest('get', '/posts');
  }

  // Generic data handling
  async createResource(endpoint, data) {
    return this.sendRequest('post', `/${endpoint}`, data);
  }

  async getResource(endpoint, id) {
    return this.sendRequest('get', `/${endpoint}/${id}`);
  }

  async deleteResource(endpoint, id) {
    return this.sendRequest('delete', `/${endpoint}/${id}`);
  }
}

