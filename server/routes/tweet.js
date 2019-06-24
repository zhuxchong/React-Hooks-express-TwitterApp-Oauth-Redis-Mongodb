const express = require("express");
const router = express.Router();
const cors = require("cors");
const request = require("request");
const {
  getAllUserTweet,
  postTweet,
  getTweetByKeyword,
  changeFavorite,
  getFavoriteList
} = require("../Repo/TweetRepo");

const AuthorizationAndGetAccess = require("../utils/AuthorizationAndGetAccess");
require("dotenv").config();
router.use(cors());

router.post("/tweet_by_user", async (req, res) => {
  const result = AuthorizationAndGetAccess(req, res);
  result
    .then(temp => {
      getAllUserTweet(JSON.parse(temp), req.body.serachInput)
        .then(temp => {
          res.send(temp);
        })
        .catch(e => {
          res.status(401);
          res.send("error1   +++++" + e);
        });
    })
    .catch(e => {
      res.status(401);
      res.send("error1   +++++" + e);
    });
});
router.post("/tweet_post_new", async (req, res) => {
  const result = AuthorizationAndGetAccess(req, res);
  result
    .then(temp => {
      postTweet(JSON.parse(temp), req.body.content)
        .then(temp => {
          res.status(200);
          res.send("OK");
        })
        .catch(e => {
          res.status(501);
          res.send("error1   +++++" + e);
        });
    })
    .catch(e => {
      res.status(401);
      res.send("error1   +++++" + e);
    });
});
router.post("/tweet_by_keyword", async (req, res) => {
  console.log("/tweet_by_keyword");
  const result = AuthorizationAndGetAccess(req, res);
  result
    .then(temp => {
      getTweetByKeyword(JSON.parse(temp), req.body.serachInput)
        .then(temp => {
          res.send(temp);
        })
        .catch(e => {
          console.log("e cathch inside");
          res.status(501);
          res.send("error1   +++++" + e);
        });
    })
    .catch(e => {
      console.log("e cathch outside");
      res.status(401);
      res.send("error1   +++++" + e);
    });
});
router.post("/tweet_favorite", async (req, res) => {
  const result = AuthorizationAndGetAccess(req, res);
  console.log(req.body.id);
  result
    .then(temp => {
      changeFavorite(JSON.parse(temp), req.body.id, req.body.nowStatus)
        .then(temp => {
          res.send(temp);
        })
        .catch(e => {
          console.log("e cathch inside");
          res.status(501);
          res.send("error1   +++++" + e);
        });
    })
    .catch(e => {
      console.log("e cathch outside");
      res.status(401);
      res.send("error1   +++++" + e);
    });
});
router.get("/tweet_favorite_list", async (req, res) => {
  console.log("/tweet_favorite");
  const result = AuthorizationAndGetAccess(req, res);
  result
    .then(temp => {
      getFavoriteList(JSON.parse(temp))
        .then(temp => {
          res.send(temp);
        })
        .catch(e => {
          console.log("e cathch inside");
          res.status(501);
          res.send("error1   +++++" + e);
        });
    })
    .catch(e => {
      console.log("e cathch outside");
      res.status(401);
      res.send("error1   +++++" + e);
    });
});
module.exports = router;
