import { loadTestOptions, stressTestOptions, spikeTestOptions, enduranceTestOptions, volumeTestOptions } from './config.js';
import { generateRealisticPost, generateLargePost } from './dataGenerators.js';
import { testGetAllPosts, testCreatePost } from './testFunctions.js';

// ====== CHOOSE YOUR TEST TYPE ======
export const options = loadTestOptions;        // 🟢 LOAD TEST (Default)
// export const options = stressTestOptions;   // 🔥 STRESS TEST
// export const options = spikeTestOptions;    // ⚡ SPIKE TEST
// export const options = enduranceTestOptions; // ⏱️ ENDURANCE TEST
// export const options = volumeTestOptions;   // 📊 VOLUME TEST

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