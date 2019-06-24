const redis = require("redis");
require("dotenv").config();
const connect = () =>
  redis.createClient({
    port: process.env.PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
  });
module.exports = connect;
