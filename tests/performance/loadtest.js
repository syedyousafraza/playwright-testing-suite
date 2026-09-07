import { loadTestOptions, stressTestOptions, spikeTestOptions, enduranceTestOptions, volumeTestOptions } from './config.js';
import { generateRealisticPost, generateLargePost } from './dataGenerators.js';
import { testGetAllPosts, testCreatePost } from './testFunctions.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js';

const testOptions = {
  load: loadTestOptions,
  stress: stressTestOptions,
  spike: spikeTestOptions,
  endurance: enduranceTestOptions,
  volume: volumeTestOptions,
};

export const options = testOptions[__ENV.TEST_TYPE || 'load'] || loadTestOptions;

const BASE_URL = __ENV.BASE_URL || 'https://jsonplaceholder.typicode.com';

// ====== MAIN TEST FUNCTION ======
export default function() {
  testGetAllPosts(BASE_URL);
  const payload = __ENV.TEST_TYPE === 'volume' ? 
    JSON.stringify(generateLargePost()) : 
    JSON.stringify(generateRealisticPost());
  testCreatePost(BASE_URL, payload);
}

export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    'test-results/k6-summary.json': JSON.stringify(data, null, 2),
  };
}