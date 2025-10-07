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