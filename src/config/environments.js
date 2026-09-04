const defaultBaseURL = 'https://advantageonlineshopping.com';

export const environments = {
  dev: {
    baseURL: process.env.DEV_URL,
    credentials: {
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD
    }
  },
  staging: {
    baseURL: process.env.STAGING_URL,
    credentials: {
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD
    }
  },
  prod: {
    baseURL: process.env.PROD_URL,
    credentials: {
      username: process.env.TEST_USERNAME,
      password: process.env.TEST_PASSWORD
    }
  }
};

export function getEnvironmentConfig() {
  const requestedEnvironment = process.env.ENV || process.env.TEST_ENV;

  if (!requestedEnvironment) {
    return {
      name: 'default',
      baseURL: process.env.BASE_URL || defaultBaseURL,
      credentials: environments.staging.credentials,
    };
  }

  const config = environments[requestedEnvironment];
  if (!config) {
    throw new Error(`Unknown test environment: ${requestedEnvironment}`);
  }

  if (!config.baseURL) {
    throw new Error(`Missing URL for test environment: ${requestedEnvironment}`);
  }

  return { name: requestedEnvironment, ...config };
}