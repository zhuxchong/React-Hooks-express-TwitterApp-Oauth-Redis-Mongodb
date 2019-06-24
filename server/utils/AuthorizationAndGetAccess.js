const jwt = require("jsonwebtoken");
require("dotenv").config();
const AuthorizationAndGetAccess = (req, res) => {
  return new Promise((resolve, reject) => {
    let decoded = jwt.verify(
      req.headers["authorization"],
      process.env.JWT_SECRET,
      function(err, decoded) {
        if (err) {
          res.status(401);
          res.send("error1   +++++" + err);
        }
        return decoded;
      }
    );
    console.log("redis start");

    req.redis.get(decoded.user_id, function(err, r) {
      if (err) {
        reject(401);
        res.status(401);
        res.send("error1   +++++" + err);
      }
      if (r) {
        console.log("redis end");
        resolve(r);
      } else {
        reject(401);
      }
    });

    // req.redis.end(true);
  });
};
module.exports = AuthorizationAndGetAccess;
