/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Model/Message.js":
/*!**************************!*\
  !*** ./Model/Message.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var Scheme = mongoose.Schema;
var MessageSchema = new Scheme({
  user: {
    type: String
  },
  topic: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  }
});
var Message = mongoose.model("4mationDiscussboard", MessageSchema);
module.exports = Message;

/***/ }),

/***/ "./Repo/TweetRepo.js":
/*!***************************!*\
  !*** ./Repo/TweetRepo.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var request = __webpack_require__(/*! request */ "request");

__webpack_require__(/*! dotenv */ "dotenv").config();

var getAllUserTweet = function getAllUserTweet(accessObj, searchContent) {
  var url = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".concat(searchContent, "&count=200");
  return getOperation(accessObj, url, true);
};

var getTweetByKeyword = function getTweetByKeyword(accessObj, searchContent) {
  var url = "https://api.twitter.com/1.1/search/tweets.json?q=".concat(searchContent, "&result_type=mixed&count=100");
  return getOperation(accessObj, url);
};

var getFavoriteList = function getFavoriteList(accessObj) {
  var url = "https://api.twitter.com/1.1/favorites/list.json?count=200&screen_name=".concat(accessObj.screen_name);
  return getOperation(accessObj, url, false, true);
};

function getOperation(accessObj, url, notFavorite, favoritedList) {
  return new Promise(function (resolve, reject) {
    request.get({
      url: url,
      oauth: {
        token: accessObj.access_token,
        token_secret: accessObj.access_secret,
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET
      }
    }, function (err, r, body) {
      if (err || JSON.parse(body).error) {
        reject(function (err) {
          console.error("server error " + err);
        });
        return;
      }

      if (notFavorite) {
        resolve(JSON.parse(body).reduce(function (pre, now) {
          var _temp;

          var temp = (_temp = {
            name: now.user.name
          }, _defineProperty(_temp, "Scree Name", now.user.screen_name), _defineProperty(_temp, "text", now.text), _temp);
          pre = [].concat(_toConsumableArray(pre), [temp]);
          return pre;
        }, []));
      } else {
        var temp = favoritedList ? JSON.parse(body) : JSON.parse(body).statuses;
        resolve(temp.reduce(function (pre, now) {
          var _temp2;

          var temp = (_temp2 = {
            tweet_id: now.id_str,
            text: now.text,
            name: now.user.name
          }, _defineProperty(_temp2, "Scree Name", now.user.screen_name), _defineProperty(_temp2, "favorited", now.favorited), _temp2);
          pre = [].concat(_toConsumableArray(pre), [temp]);
          return pre;
        }, []));
      }
    });
  });
}

var postTweet = function postTweet(accessObj, tweet) {
  var url = "https://api.twitter.com/1.1/statuses/update.json?status=".concat(tweet);
  return simpleReturn(accessObj, url);
};

var changeFavorite = function changeFavorite(accessObj, id, status) {
  var url = status ? "https://api.twitter.com/1.1/favorites/destroy.json?id=".concat(id) : "https://api.twitter.com/1.1/favorites/create.json?id=".concat(id);
  return simpleReturn(accessObj, url);
};

function simpleReturn(accessObj, url) {
  return new Promise(function (resolve, reject) {
    request.post({
      url: url,
      oauth: {
        token: accessObj.access_token,
        token_secret: accessObj.access_secret,
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET
      }
    }, function (err, r, body) {
      console.log(" get post");

      if (err || JSON.parse(body).errors) {
        reject(function () {
          console.error("server error");
        });
        return;
      }

      resolve("200 OK");
    });
  });
}

module.exports = {
  getAllUserTweet: getAllUserTweet,
  postTweet: postTweet,
  getTweetByKeyword: getTweetByKeyword,
  changeFavorite: changeFavorite,
  getFavoriteList: getFavoriteList
};

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var express = __webpack_require__(/*! express */ "express");

var app = express();

var radisStore = __webpack_require__(/*! ./utils/RedisConnect */ "./utils/RedisConnect.js");

var authTool = __webpack_require__(/*! ./utils/AuthTool */ "./utils/AuthTool.js");

var morgan = __webpack_require__(/*! morgan */ "morgan");

app.use(express.json());

var cors = __webpack_require__(/*! cors */ "cors");

if ("development".trim() === "development") {
  app.use(__webpack_require__(/*! ./utils/logglyMiddleware.dev */ "./utils/logglyMiddleware.dev.js"));
}

if ("development".trim() === "development") {
  app.use(morgan("common"));
}

app.use(cors());
app.use("/auth", radisStore, __webpack_require__(/*! ./routes/login */ "./routes/login.js"));
app.use("/tweet", authTool, __webpack_require__(/*! ./routes/tweet */ "./routes/tweet.js"));
app.use("/message", authTool, __webpack_require__(/*! ./routes/messageBoard */ "./routes/messageBoard.js"));
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("server started at ".concat(PORT));

  __webpack_require__(/*! ./utils/MongoConnect */ "./utils/MongoConnect.js");
});

/***/ }),

/***/ "./routes/login.js":
/*!*************************!*\
  !*** ./routes/login.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var express = __webpack_require__(/*! express */ "express");

var router = express.Router();

var cors = __webpack_require__(/*! cors */ "cors");

var request = __webpack_require__(/*! request */ "request");

var jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

__webpack_require__(/*! dotenv */ "dotenv").config();

router.use(cors());
router.get("/login/request_token", function (req, res) {
  request.post({
    url: "https://api.twitter.com/oauth/request_token",
    oauth: {
      oauth_callback: "http://localhost:3000/loading",
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET
    }
  }, function (err, r, body) {
    if (err) {
      return res.send(500, {
        message: err.message
      });
    }

    var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    res.send(JSON.parse(jsonStr));
  });
});
router.post("/login/get_token", function (req, res) {
  request.post({
    url: "https://api.twitter.com/oauth/access_token",
    oauth: {
      consumer_key: process.env.CONSUMER_KEY,
      consumer_secret: process.env.CONSUMER_SECRET,
      token: req.body.oauthToken
    },
    form: {
      oauth_verifier: req.body.verifier
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }, function (err, r, body) {
    if (err) {
      return res.send(500, {
        message: err.message
      });
    }

    var bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
    var parsedBody = JSON.parse(bodyString);
    req.redis.set(parsedBody.user_id, JSON.stringify({
      screen_name: parsedBody.screen_name,
      user_id: parsedBody.user_id,
      access_token: parsedBody.oauth_token,
      access_secret: parsedBody.oauth_token_secret
    }), function (err) {
      if (err) {
        console.error("err: ", err);
      }
    });
    req.redis.expire(parsedBody.user_id, process.env.AUTH_TIME, function (err) {
      if (err) {
        console.error("err: ", err);
      }
    });
    var token = jwt.sign({
      user_id: parsedBody.user_id
    }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    res.send({
      jwt: token,
      screen_name: parsedBody.screen_name
    });
  });
});
module.exports = router;

/***/ }),

/***/ "./routes/messageBoard.js":
/*!********************************!*\
  !*** ./routes/messageBoard.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = __webpack_require__(/*! express */ "express");

var router = express.Router();

var cors = __webpack_require__(/*! cors */ "cors");

var Message = __webpack_require__(/*! ../Model/Message */ "./Model/Message.js");

var moment = __webpack_require__(/*! moment */ "moment");

__webpack_require__(/*! dotenv */ "dotenv").config();

router.use(cors());
router.post("/add_new_message",
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = req.access;
            result.then(function () {
              var messageData = {
                user: req.body.user,
                topic: req.body.subject,
                content: req.body.content,
                date: new Date()
              };
              Message.create(messageData).then(function () {
                return res.send("200 OK");
              })["catch"](function (e) {
                return res.sendStatus(e);
              });
            })["catch"](function (e) {
              res.sendStatus(e);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/get_message",
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = req.access;
            result.then(function () {
              Message.aggregate([{
                $facet: {
                  getData: [{
                    $match: {}
                  }, {
                    $sort: {
                      date: -1
                    }
                  }, {
                    $skip: req.body.skip
                  }, {
                    $limit: req.body.limit
                  }],
                  totalCount: [{
                    $group: {
                      _id: null,
                      count: {
                        $sum: 1
                      }
                    }
                  }]
                }
              }]).then(function (arr) {
                var temp = arr[0].getData;
                temp.map(function (i) {
                  i.date = moment(i.date).format("MMMM Do YYYY, h:mm:ss a");
                });
                res.send({
                  result: temp,
                  count: arr[0].totalCount[0]
                });
              })["catch"](function (e) {
                res.sendStatus(e);
              });
            })["catch"](function (e) {
              res.sendStatus(e);
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
module.exports = router;

/***/ }),

/***/ "./routes/tweet.js":
/*!*************************!*\
  !*** ./routes/tweet.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var express = __webpack_require__(/*! express */ "express");

var router = express.Router();

var cors = __webpack_require__(/*! cors */ "cors");

var _require = __webpack_require__(/*! ../Repo/TweetRepo */ "./Repo/TweetRepo.js"),
    getAllUserTweet = _require.getAllUserTweet,
    postTweet = _require.postTweet,
    getTweetByKeyword = _require.getTweetByKeyword,
    changeFavorite = _require.changeFavorite,
    getFavoriteList = _require.getFavoriteList;

__webpack_require__(/*! dotenv */ "dotenv").config();

router.use(cors());
router.post("/tweet_by_user",
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            result = req.access;
            result.then(function (temp) {
              getAllUserTweet(JSON.parse(temp), req.body.serachInput).then(function (temp) {
                res.send(temp);
              })["catch"](function (e) {
                res.sendStatus(e);
                res.send("error1   +++++" + e);
              });
            })["catch"](function (e) {
              res.sendStatus(e);
              res.send("error1   +++++" + e);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
router.post("/tweet_post_new",
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            result = req.access;
            result.then(function (temp) {
              postTweet(JSON.parse(temp), req.body.content).then(function () {
                res.status(200);
                res.send("OK");
              })["catch"](function (e) {
                res.sendStatus(e);
                res.send("error1   +++++" + e);
              });
            })["catch"](function (e) {
              res.sendStatus(e);
              res.send("error1   +++++" + e);
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post("/tweet_by_keyword",
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log("/tweet_by_keyword");
            result = req.access;
            result.then(function (temp) {
              getTweetByKeyword(JSON.parse(temp), req.body.serachInput).then(function (temp) {
                res.send(temp);
              })["catch"](function (e) {
                console.log("e cathch inside");
                res.sendStatus(e);
                res.send("error1   +++++" + e);
              });
            })["catch"](function (e) {
              console.log("e cathch outside");
              res.sendStatus(e);
              res.send("error1   +++++" + e);
            });

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.post("/tweet_favorite",
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            result = req.access;
            console.log(req.body.id);
            result.then(function (temp) {
              changeFavorite(JSON.parse(temp), req.body.id, req.body.nowStatus).then(function (temp) {
                res.send(temp);
              })["catch"](function (e) {
                console.log("e cathch inside");
                res.sendStatus(e);
                res.send("error1   +++++" + e);
              });
            })["catch"](function (e) {
              console.log("e cathch outside");
              res.sendStatus(e);
              res.send("error1   +++++" + e);
            });

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router.get("/tweet_favorite_list",
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var result;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            console.log("/tweet_favorite");
            result = req.access;
            result.then(function (temp) {
              getFavoriteList(JSON.parse(temp)).then(function (temp) {
                res.send(temp);
              })["catch"](function (e) {
                console.log("e cathch inside");
                res.sendStatus(e);
                res.send("error1   +++++" + e);
              });
            })["catch"](function (e) {
              console.log("e cathch outside");
              res.sendStatus(e);
              res.send("error1   +++++" + e);
            });

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
module.exports = router;

/***/ }),

/***/ "./utils/AuthTool.js":
/*!***************************!*\
  !*** ./utils/AuthTool.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redis = __webpack_require__(/*! redis */ "redis");

__webpack_require__(/*! dotenv */ "dotenv").config();

var jwt = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");

var client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
});

var authTool = function authTool(req, res, next) {
  var decoded = jwt.verify(req.headers["authorization"], process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      res.status(401);
      res.send("error1   +++++" + err);
      return;
    }

    if (!decoded) res.status(401);
    return decoded;
  });
  var promise = new Promise(function (resolve, reject) {
    console.log("redis mid start");
    client.get(decoded.user_id, function (err, r) {
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
    }); // req.redis.end(true);
  });
  req.access = promise;
  next();
};

module.exports = authTool;

/***/ }),

/***/ "./utils/MongoConnect.js":
/*!*******************************!*\
  !*** ./utils/MongoConnect.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var mongoose = __webpack_require__(/*! mongoose */ "mongoose");

var bluebird = __webpack_require__(/*! bluebird */ "bluebird");

__webpack_require__(/*! dotenv */ "dotenv").config(); // to read value of process.env.MongoURI
// Get Mongoose to use the bluebird promise library


mongoose.Promise = bluebird;
mongoose.connect(process.env.MONGO_DB, {
  useNewUrlParser: true
}).then(function () {
  return console.log("Mongodb connected");
})["catch"](function (err) {
  return console.log(err);
});
module.exports = mongoose;

/***/ }),

/***/ "./utils/RedisConnect.js":
/*!*******************************!*\
  !*** ./utils/RedisConnect.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redis = __webpack_require__(/*! redis */ "redis");

__webpack_require__(/*! dotenv */ "dotenv").config();

var client = redis.createClient({
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD
});

var redisStore = function redisStore(req, res, next) {
  req.redis = client;
  next();
};

module.exports = redisStore;

/***/ }),

/***/ "./utils/logglyMiddleware.dev.js":
/*!***************************************!*\
  !*** ./utils/logglyMiddleware.dev.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var expressWinston = __webpack_require__(/*! express-winston */ "express-winston");

var winston = __webpack_require__(/*! winston */ "winston");

__webpack_require__(/*! winston-loggly-bulk */ "winston-loggly-bulk");

var errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.Console()]
});
module.exports = errorLogger;

/***/ }),

/***/ 0:
/*!**************************************!*\
  !*** multi @babel/polyfill ./app.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! @babel/polyfill */"@babel/polyfill");
module.exports = __webpack_require__(/*! ./app.js */"./app.js");


/***/ }),

/***/ "@babel/polyfill":
/*!**********************************!*\
  !*** external "@babel/polyfill" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/polyfill");

/***/ }),

/***/ "bluebird":
/*!***************************!*\
  !*** external "bluebird" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "express-winston":
/*!**********************************!*\
  !*** external "express-winston" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express-winston");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),

/***/ "request":
/*!**************************!*\
  !*** external "request" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("request");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston");

/***/ }),

/***/ "winston-loggly-bulk":
/*!**************************************!*\
  !*** external "winston-loggly-bulk" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("winston-loggly-bulk");

/***/ })

/******/ });
//# sourceMappingURL=main.js.map