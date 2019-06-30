const express = require("express");
const router = express.Router();
const cors = require("cors");
const request = require("request");
const jwt = require("jsonwebtoken");

require("dotenv").config();
router.use(cors());

router.get("/login/request_token", (req, res) => {
  request.post(
    {
      url: "https://api.twitter.com/oauth/request_token",
      oauth: {
        oauth_callback: `${req.query.url}loading`,
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET
      }
    },
    function(err, r, body) {
      if (err) {
        return res.send(500, { message: err.message });
      }

      var jsonStr =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    }
  );
});

router.post("/login/get_token", (req, res) => {
  request.post(
    {
      url: `https://api.twitter.com/oauth/access_token`,
      oauth: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        token: req.body.oauthToken
      },
      form: { oauth_verifier: req.body.verifier },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    },
    function(err, r, body) {
      if (err) {
        return res.send(500, { message: err.message });
      }

      const bodyString =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      const parsedBody = JSON.parse(bodyString);

      req.redis.set(
        parsedBody.user_id,
        JSON.stringify({
          screen_name: parsedBody.screen_name,
          user_id: parsedBody.user_id,
          access_token: parsedBody.oauth_token,
          access_secret: parsedBody.oauth_token_secret
        }),
        err => {
          if (err) {
            console.error("err: ", err);
          }
        }
      );

      req.redis.expire(parsedBody.user_id, process.env.AUTH_TIME, err => {
        if (err) {
          console.error("err: ", err);
        }
      });

      let token = jwt.sign(
        { user_id: parsedBody.user_id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h"
        }
      );

      res.send({
        jwt: token,
        screen_name: parsedBody.screen_name
      });
    }
  );
});

module.exports = router;
