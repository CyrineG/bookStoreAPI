const redis = require('redis');
const client = redis.createClient({
  url: 'redis://redis',
  port: '6333',
});

module.exports = client;
