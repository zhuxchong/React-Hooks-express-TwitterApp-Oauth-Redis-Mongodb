const redis = require("redis");
require("dotenv").config();
const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
});
const redisStore = (req, res, next) => {
  req.redis = client;

  next();
};

module.exports = redisStore;
