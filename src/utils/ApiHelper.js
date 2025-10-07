// src/utils/ApiHelper.js
export class ApiHelper {
  constructor(request) {
    this.request = request;
    this.baseURL = process.env.API_URL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    if (!this.baseURL) {
      throw new Error('API_URL environment variable is required');
    }
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

  // User endpoints
  async createUser(userData) {
    return this.sendRequest('post', '/api/users', userData);
  }

  async getUser(userId) {
    return this.sendRequest('get', `/api/users/${userId}`);
  }

  async updateUser(userId, userData) {
    return this.sendRequest('put', `/api/users/${userId}`, userData);
  }

  async deleteUser(userId) {
    return this.sendRequest('delete', `/api/users/${userId}`);
  }

  async listUsers(page = 1) {
    return this.sendRequest('get', `/api/users?page=${page}`);
  }

  // Authentication endpoints
  async login(email, password) {
    return this.sendRequest('post', '/api/login', { email, password });
  }

  async register(email, password) {
    return this.sendRequest('post', '/api/register', { email, password });
  }

  // Generic data handling
  async createResource(endpoint, data) {
    return this.sendRequest('post', `/api/${endpoint}`, data);
  }

  async getResource(endpoint, id) {
    return this.sendRequest('get', `/api/${endpoint}/${id}`);
  }

  async deleteResource(endpoint, id) {
    return this.sendRequest('delete', `/api/${endpoint}/${id}`);
  }
}

