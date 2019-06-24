const request = require("request");
require("dotenv").config();
const getAllUserTweet = (accessObj, searchContent) => {
  const url = `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${searchContent}&count=200`;
  return getOperation(accessObj, url, true);
};

const getTweetByKeyword = (accessObj, searchContent) => {
  const url = `https://api.twitter.com/1.1/search/tweets.json?q=${searchContent}&result_type=mixed&count=100`;
  return getOperation(accessObj, url);
};

const getFavoriteList = accessObj => {
  const url = `https://api.twitter.com/1.1/favorites/list.json?count=200&screen_name=${
    accessObj.screen_name
  }`;
  return getOperation(accessObj, url, false, true);
};
function getOperation(accessObj, url, notFavorite, favoritedList) {
  return new Promise((resolve, reject) => {
    request.get(
      {
        url: url,
        oauth: {
          token: accessObj.access_token,
          token_secret: accessObj.access_secret,
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET
        }
      },

      function(err, r, body) {
        if (err || JSON.parse(body).error) {
          reject(err => {
            console.error("server error " + err);
          });
          return;
        }
        if (notFavorite) {
          resolve(
            JSON.parse(body).reduce((pre, now) => {
              let temp = {
                name: now.user.name,
                ["Scree Name"]: now.user.screen_name,
                text: now.text
              };
              pre = [...pre, temp];
              return pre;
            }, [])
          );
        } else {
          const temp = favoritedList
            ? JSON.parse(body)
            : JSON.parse(body).statuses;
          resolve(
            temp.reduce((pre, now) => {
              let temp = {
                tweet_id: now.id_str,
                text: now.text,
                name: now.user.name,
                ["Scree Name"]: now.user.screen_name,
                favorited: now.favorited
              };
              pre = [...pre, temp];
              return pre;
            }, [])
          );
        }
      }
    );
  });
}

const postTweet = (accessObj, tweet) => {
  const url = `https://api.twitter.com/1.1/statuses/update.json?status=${tweet}`;
  return simpleReturn(accessObj, url);
};
const changeFavorite = (accessObj, id, status) => {
  const url = status
    ? `https://api.twitter.com/1.1/favorites/destroy.json?id=${id}`
    : `https://api.twitter.com/1.1/favorites/create.json?id=${id}`;

  return simpleReturn(accessObj, url);
};
function simpleReturn(accessObj, url) {
  return new Promise((resolve, reject) => {
    request.post(
      {
        url: url,
        oauth: {
          token: accessObj.access_token,
          token_secret: accessObj.access_secret,
          consumer_key: process.env.CONSUMER_KEY,
          consumer_secret: process.env.CONSUMER_SECRET
        }
      },

      function(err, r, body) {
        console.log(" get post");
        if (err || JSON.parse(body).errors) {
          reject(() => {
            console.error("server error");
          });
          return;
        }
        resolve("200 OK");
      }
    );
  });
}

module.exports = {
  getAllUserTweet,
  postTweet,
  getTweetByKeyword,
  changeFavorite,
  getFavoriteList
};
