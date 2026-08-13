import Redis from 'ioredis';

class RedisUtil {
  static redis: Redis | null = null;
  initialize() {
    const redisUrl = process.env.REDIS_URL || process.env.REDIS_HOST;
    if (!redisUrl) {
      return;
    }
    try {
      RedisUtil.redis = new Redis(redisUrl, {
        maxRetriesPerRequest: 1,
        retryStrategy: () => null,
      });
      RedisUtil.redis.on('error', (err) => {
        // Handled silently to prevent unhandled error event noise
      });
    } catch (err) {
      // Redis skipped
    }
  }
}

export { RedisUtil };

