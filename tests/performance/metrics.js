import { Rate, Trend, Counter } from 'k6/metrics';

export const errorRate = new Rate('error_rate');
export const responseTimeGetPosts = new Trend('response_time_get_posts');
export const responseTimeCreatePost = new Trend('response_time_create_post');
export const totalApiCalls = new Counter('total_api_calls');
