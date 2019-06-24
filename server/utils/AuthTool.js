const redis = require("redis");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
});
const authTool = (req, res, next) => {
  let decoded = jwt.verify(
    req.headers["authorization"],
    process.env.JWT_SECRET,
    function(err, decoded) {
      if (err) {
        res.status(401);
        res.send("error1   +++++" + err);
        return;
      }

      if (!decoded) res.status(401);
      return decoded;
    }
  );

  const promise = new Promise((resolve, reject) => {
    console.log("redis mid start");

    client.get(decoded.user_id, function(err, r) {
      console.log("redis processing");
      if (err) {
        reject(401);
        res.status(401);
        res.send("error1   +++++" + err);
      }

      if (r) {
        console.log("redis mid end");
        resolve(r);
      } else {
        reject(401);
      }
    });

    // req.redis.end(true);
  });
  req.access = promise;

  next();
};

module.exports = authTool;
