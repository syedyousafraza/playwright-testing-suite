import { loadTestOptions, stressTestOptions, spikeTestOptions, enduranceTestOptions, volumeTestOptions } from './config.js';
import { generateRealisticPost, generateLargePost } from './dataGenerators.js';
import { testGetAllPosts, testCreatePost } from './testFunctions.js';

const testOptions = {
  load: loadTestOptions,
  stress: stressTestOptions,
  spike: spikeTestOptions,
  endurance: enduranceTestOptions,
  volume: volumeTestOptions,
};

export const options = testOptions[__ENV.TEST_TYPE || 'load'] || loadTestOptions;

// ====== CONFIGURATION ======
const BASE_URL = 'https://jsonplaceholder.typicode.com';

// ====== MAIN TEST FUNCTION ======
export default function() {
  testGetAllPosts(BASE_URL);
  const payload = __ENV.TEST_TYPE === 'volume' ? 
    JSON.stringify(generateLargePost()) : 
    JSON.stringify(generateRealisticPost());
  testCreatePost(BASE_URL, payload);
}