import http from 'k6/http';
import { check } from 'k6';
import { responseTimeGetPosts, responseTimeCreatePost, errorRate } from './metrics.js';

export function testGetAllPosts(BASE_URL) {
  const response = http.get(`${BASE_URL}/posts`, {
    tags: { name: 'GetAllPosts' },
  });

  const isSuccess = check(response, {
    'GET /posts - Status is 200': (r) => r.status === 200,
    'GET /posts - Response time < 2s': (r) => r.timings.duration < 2000,
    'GET /posts - Has content': (r) => {
      try {
        const posts = JSON.parse(r.body);
        return Array.isArray(posts) && posts.length > 0;
      } catch {
        return false;
      }
    },
    'GET /posts - Valid JSON structure': (r) => {
      try {
        const posts = JSON.parse(r.body);
        return posts.every(post => post.hasOwnProperty('id') && post.hasOwnProperty('title'));
      } catch {
        return false;
      }
    },
  });

  responseTimeGetPosts.add(response.timings.duration);
  errorRate.add(!isSuccess);

  if (!isSuccess) {
    console.error(`❌ GET /posts failed: ${response.status} - ${response.body.substring(0, 100)}`);
  }
}

export function testCreatePost(BASE_URL, payload) {
  const response = http.post(`${BASE_URL}/posts`, payload, {
    headers: { 'Content-Type': 'application/json' },
    tags: { name: 'CreatePost' },
  });

  const isSuccess = check(response, {
    'POST /posts - Status is 201': (r) => r.status === 201,
    'POST /posts - Response time < 3s': (r) => r.timings.duration < 3000,
    'POST /posts - Returns created post': (r) => {
      try {
        const post = JSON.parse(r.body);
        return post.hasOwnProperty('id') && post.id > 0;
      } catch {
        return false;
      }
    },
  });

  responseTimeCreatePost.add(response.timings.duration);
  errorRate.add(!isSuccess);
}
