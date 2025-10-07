// // src/config/config.js
// export const environments = {
//   dev: {
//     name: 'Development',
//     baseUrl: 'https://dev.example.com',
//     apiUrl: 'https://api.dev.example.com',
//   },
//   staging: {
//     name: 'Staging',
//     baseUrl: 'https://www.saucedemo.com/',
//     apiUrl: 'https://api.staging.example.com',
//   },
//   production: {
//     name: 'Production',
//     baseUrl: 'https://example.com',
//     apiUrl: 'https://api.example.com',
//   },
// };

// export function getEnvironmentConfig() {
//   const env = process.env.TEST_ENV || 'dev';
//   return environments[env];
// }

// export const testConfig = {
//   defaultTimeout: 30000,
//   retryCount: 0,
//   headless: process.env.HEADLESS !== 'false',
//   slowMo: parseInt(process.env.SLOW_MO || '0'),
// };