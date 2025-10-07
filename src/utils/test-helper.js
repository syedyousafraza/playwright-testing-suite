import { environments } from '../config/environments';

export const getEnvironmentConfig = () => {
  const env = process.env.ENV || process.env.TEST_ENV || 'staging';
  return environments[env];
};