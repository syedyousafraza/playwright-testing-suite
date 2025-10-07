// import http from 'k6/http';
// import { check, sleep } from 'k6';

// // ===== CONFIGURATION - UPDATE THESE VALUES =====
// const BASE_URL = 'https://your-api-domain.com';  // 👈 UPDATE: Your API base URL
// const ODATA_ENDPOINT = '/odata/YourEntity';       // 👈 UPDATE: Your OData endpoint
// const AUTH_TOKEN = 'your-bearer-token-here';      // 👈 UPDATE: Your auth token (if needed)

// // Test configuration
// export const options = {
//   // Start small for testing
//   stages: [
//     { duration: '30s', target: 2 },    // Start with 2 users
//     { duration: '1m', target: 5 },     // Increase to 5 users  
//     { duration: '30s', target: 10 },   // Peak at 10 users
//     { duration: '30s', target: 0 },    // Ramp down
//   ],
  
//   thresholds: {
//     http_req_duration: ['p(95)<3000'],  // 95% requests under 3s
//     http_req_failed: ['rate<0.05'],     // Error rate under 5%
//   },
// };

// export default function() {
//   // ===== HEADERS - Copy from Insomnia =====
//   const headers = {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'Authorization': `Bearer ${AUTH_TOKEN}`,  // 👈 UPDATE: Your auth method
//     // 👈 ADD: Any other headers from your Insomnia request
//     // 'X-Custom-Header': 'value',
//     // 'User-Agent': 'YourApp/1.0',
//   };

//   // ===== REQUEST PAYLOAD - Copy from Insomnia =====
//   const payload = JSON.stringify({
//     // 👈 UPDATE: Replace with your actual POST data from Insomnia
//     "Name": "Test Product",
//     "Description": "Created during load test",
//     "Price": 99.99,
//     "CategoryId": 1,
//     // Add all fields from your Insomnia request body
//   });

//   console.log(`🚀 Making POST request to: ${BASE_URL}${ODATA_ENDPOINT}`);

//   // Make the POST request
//   const response = http.post(`${BASE_URL}${ODATA_ENDPOINT}`, payload, {
//     headers: headers,
//     timeout: '30s',
//   });

//   // ===== VALIDATION CHECKS =====
//   check(response, {
//     'status is success': (r) => r.status >= 200 && r.status < 300,
//     'response time OK': (r) => r.timings.duration < 5000,
//     'response has body': (r) => r.body && r.body.length > 0,
    
//     // OData specific checks
//     'response is JSON': (r) => {
//       try {
//         JSON.parse(r.body);
//         return true;
//       } catch {
//         return false;
//       }
//     },
    
//     // 👈 ADD: Your specific validation checks
//     // 'contains expected field': (r) => r.body.includes('expectedValue'),
//     // 'OData context present': (r) => r.body.includes('@odata.context'),
//   });

//   // Log response for debugging (remove in production)
//   if (response.status >= 400) {
//     console.error(`❌ Request failed: ${response.status} - ${response.body.substring(0, 100)}...`);
//   } else {
//     console.log(`✅ Request successful: ${response.status}`);
//   }

//   // Simulate user think time
//   sleep(Math.random() * 2 + 1); // Random 1-3 seconds
// }

// // ===== SETUP & TEARDOWN =====
// export function setup() {
//   console.log('🚀 Starting load test for your OData API...');
//   console.log(`📍 Target: ${BASE_URL}${ODATA_ENDPOINT}`);
  
//   // Optional: Test connectivity before starting
//   const testResponse = http.get(BASE_URL);
//   if (testResponse.status !== 200) {
//     console.warn('⚠️  Base URL might not be accessible');
//   }
// }

// export function teardown(data) {
//   console.log('✅ Load test completed!');
//   console.log('📊 Check the summary above for detailed metrics');
// }