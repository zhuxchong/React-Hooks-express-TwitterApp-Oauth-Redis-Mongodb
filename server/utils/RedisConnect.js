const redis = require("redis");
const connect = () =>
  redis.createClient({
    port: "19363",
    host: "redis-19363.c12.us-east-1-4.ec2.cloud.redislabs.com",
    password: "jLVPvAVMRhFKulvzxnYljA8m8myV0dZI"
  });
module.exports = connect;
