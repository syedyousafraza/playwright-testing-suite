import { Rate, Trend } from 'k6/metrics';

export const errorRate = new Rate('error_rate');
export const responseTimeGetPosts = new Trend('response_time_get_posts');
export const responseTimeCreatePost = new Trend('response_time_create_post');
