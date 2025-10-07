// ====== TEST CONFIGURATIONS ======

export const loadTestOptions = {
  stages: [
        { duration: '30s', target: 5 },

    { duration: '2m', target: 20 },
    // { duration: '5m', target: 20 },
    // { duration: '2m', target: 50 },
    // { duration: '5m', target: 50 },
    // { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<5000'],
    http_req_failed: ['rate<0.02'],
    error_rate: ['rate<0.02'],
    response_time_get_posts: ['p(95)<1500'],
    response_time_create_post: ['p(95)<3000'],
  },
};

export const stressTestOptions = {
  stages: [
    { duration: '1m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '2m', target: 300 },
    { duration: '2m', target: 400 },
    { duration: '5m', target: 400 },
    { duration: '3m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<10000'],
    http_req_failed: ['rate<0.1'],
  },
};

export const spikeTestOptions = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '10s', target: 200 },
    { duration: '1m', target: 200 },
    { duration: '10s', target: 10 },
    { duration: '1m', target: 10 },
    { duration: '10s', target: 300 },
    { duration: '30s', target: 300 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.05'],
  },
};

export const enduranceTestOptions = {
  stages: [
    { duration: '5m', target: 30 },
    { duration: '30m', target: 30 },
    { duration: '5m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<3000'],
    http_req_failed: ['rate<0.01'],
    'response_time_get_posts': ['p(95)<2000'],
  },
};

export const volumeTestOptions = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '10m', target: 10 },
    { duration: '2m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'],
    http_req_failed: ['rate<0.02'],
  },
};
