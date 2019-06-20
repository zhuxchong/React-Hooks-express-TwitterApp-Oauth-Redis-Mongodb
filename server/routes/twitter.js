const express = require("express");
const router = express.Router();
const cors = require("cors");
const request = require("request");
const passport = require("passport");
const axios = require("axios");
router.use(cors());

var generateToken = function(req, res, next) {
  req.token = createToken(req.auth);
  return next();
};

var sendToken = function(req, res) {
  res.setHeader("x-auth-token", req.token);

  return res.status(200).send(JSON.stringify(req.user));
};

router.get("/twitter/request_token", (req, res) => {
  request.post(
    {
      url: "https://api.twitter.com/oauth/request_token",
      oauth: {
        oauth_callback: "http://localhost:3000/loading",
        consumer_key: "mj5bI5T8g3AhqSVlIaeb1uXpl",
        consumer_secret: "43qHVTlSxENGXwjGlBGI61HjoUGQBxiL7UsjCbrTeRB4MU9Wf9"
      }
    },
    function(err, r, body) {
      if (err) {
        return res.send(500, { message: e.message });
      }

      var jsonStr =
        '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
      res.send(JSON.parse(jsonStr));
    }
  );
});

router.post(
  "/twitter/get_token",
  (req, res, next) => {
    request.post(
      {
        url: `https://api.twitter.com/oauth/access_token`,
        oauth: {
          consumer_key: "mj5bI5T8g3AhqSVlIaeb1uXpl",
          consumer_secret: "43qHVTlSxENGXwjGlBGI61HjoUGQBxiL7UsjCbrTeRB4MU9Wf9",
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

        req.body["oauth_token"] = parsedBody.oauth_token;
        req.body["oauth_token_secret"] = parsedBody.oauth_token_secret;
        req.body["user_id"] = parsedBody.user_id;
        res.send({
          accessToken: parsedBody.oauth_token,
          accessTokenSecret: parsedBody.oauth_token_secret,
          id: parsedBody.user_id
        });
        //next();
      }
    );
  }
  // passport.authenticate("twitter-token", { session: false }),
  // function(req, res, next) {
  //   if (!req.user) {
  //     return res.send(401, "User Not Authenticated");
  //   }

  //   req.auth = {
  //     id: req.user.id
  //   };

  //   return next();
  // },
  // generateToken,
  // sendToken
);

module.exports = router;
