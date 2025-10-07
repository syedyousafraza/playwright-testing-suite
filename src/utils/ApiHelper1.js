// // src/utils/ApiHelper.js
// export class ApiHelper {
//   constructor(request) {
//     this.request = request;
//   }

//   async createUser(userData) {
//     const response = await this.request.post('/api/users', {
//       data: userData,
//     });
//     return response.json();
//   }

//   async deleteUser(userId) {
//     await this.request.delete(`/api/users/${userId}`);
//   }

//   async getAuthToken(username, password) {
//     const response = await this.request.post('/api/auth/login', {
//       data: { username, password },
//     });
//     const data = await response.json();
//     return data.token;
//   }

//   async createTestData(endpoint, data) {
//     const response = await this.request.post(`/api/${endpoint}`, {
//       data: data,
//     });
//     return response.json();
//   }

//   async cleanupTestData(endpoint, id) {
//     await this.request.delete(`/api/${endpoint}/${id}`);
//   }
// }


// src/utils/ApiHelper.js
export class ApiHelper {
  constructor(request) {
    this.request = request;
    this.apiBaseUrl = process.env.API_URL; // Use API_URL from environment variables
    if (!this.apiBaseUrl) {
      throw new Error('API_URL environment variable is not set');
    }
  }

  async createUser(userData) {
    const response = await this.request.post(`${this.apiBaseUrl}/api/users`, {
      data: userData,
    });
    return response.json();
  }

  async getUser(userId){
    const response = await this.request.get(`${this.apiBaseUrl}/api/users/${userId}`);
    return response.json();

  }

  async deleteUser(userId) {
    await this.request.delete(`${this.apiBaseUrl}/api/users/${userId}`);
  }

  async getAuthToken(email, password) {
    const response = await this.request.post(`${this.apiBaseUrl}/api/login`, {
      data: { email, password },
    });
    if (!response.ok()) {
      throw new Error(`Login failed: ${response.status()} - ${await response.text()}`);
    }
    const data = await response.json();
    return data.token;
  }

  async createTestData(endpoint, data) {
    const response = await this.request.post(`${this.apiBaseUrl}/api/${endpoint}`, {
      data: data,
    });
    return response.json();
  }

  async cleanupTestData(endpoint, id) {
    await this.request.delete(`${this.apiBaseUrl}/api/${endpoint}/${id}`);
  }
}