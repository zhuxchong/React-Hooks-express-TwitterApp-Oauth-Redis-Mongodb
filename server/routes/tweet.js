const express = require("express");
const router = express.Router();
const cors = require("cors");

const {
  getAllUserTweet,
  postTweet,
  getTweetByKeyword,
  changeFavorite,
  getFavoriteList
} = require("../Repo/TweetRepo");

require("dotenv").config();
router.use(cors());

router.post("/tweet_by_user", async (req, res) => {
  promiseTamplate(getAllUserTweet, req, res, [req.body.content]);
});

router.post("/tweet_post_new", async (req, res) => {
  promiseTamplate(postTweet, req, res, [req.body.content]);
});
router.post("/tweet_by_keyword", async (req, res) => {
  promiseTamplate(getTweetByKeyword, req, res, [req.body.content]);
});
router.post("/tweet_favorite", async (req, res) => {
  promiseTamplate(changeFavorite, req, res, [req.body.id, req.body.content]);
});
router.get("/tweet_favorite_list", async (req, res) => {
  console.log("/tweet_favorite");
  promiseTamplate(getFavoriteList, req, res, []);
});
function promiseTamplate(fun, req, res, arg) {
  const result = req.access;
  result
    .then(temp => {
      fun(JSON.parse(temp), ...arg)
        .then(temp => {
          res.send(temp);
        })
        .catch(e => {
          console.log("e cathch inside");
          res.sendStatus(e);
          res.send("error1   +++++" + e);
        });
    })
    .catch(e => {
      console.log("e cathch outside");
      res.sendStatus(e);
      res.send("error1   +++++" + e);
    });
}
module.exports = router;
