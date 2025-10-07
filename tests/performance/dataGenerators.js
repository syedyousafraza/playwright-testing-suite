import { randomIntBetween, randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export function generateRealisticPost() {
  const titles = [
    'Advanced API Performance Testing',
    'Understanding Load vs Stress Testing',
    'Best Practices for REST APIs',
    'Microservices Architecture Patterns',
    'Database Optimization Techniques'
  ];

  const bodies = [
    'This is a comprehensive analysis of performance testing methodologies and their practical applications in modern software development.',
    'Exploring the key differences between various testing approaches and when to use each type for maximum effectiveness.',
    'A detailed guide covering implementation strategies and common pitfalls to avoid during development.'
  ];

  return {
    title: titles[Math.floor(Math.random() * titles.length)] + ` - ${randomString(8)}`,
    body: bodies[Math.floor(Math.random() * bodies.length)],
    userId: randomIntBetween(1, 10),
  };
}

export function generateLargePost() {
  const largeBody = 'Large content data '.repeat(100);
  return {
    title: `Volume Test Post - ${randomString(12)}`,
    body: largeBody + randomString(500),
    userId: randomIntBetween(1, 100),
    metadata: {
      tags: Array.from({ length: 20 }, () => randomString(10)),
      categories: Array.from({ length: 10 }, () => randomString(8)),
      timestamp: new Date().toISOString(),
    },
  };
}
